// app/src/update.ts
import {Auth, ThenUpdate} from "@calpoly/mustang";
import {Msg} from "./messages";
import {Model} from "./model";
import {PotteryItem, Profile, CartItem} from "server/models";

export default function update(
    message: Msg,
    model: Model,
    user: Auth.User
): Model | ThenUpdate<Model, Msg> {
    switch (message[0]) {
        case "item/request": {
            const {itemId} = message[1];
            if (model.item?.itemId === itemId) return model;
            return [
                {...model, item: {itemId} as PotteryItem},
                requestItem(message[1], user)
                    .then((item) => ["item/load", {itemId, item}])
            ];
        }
        case "item/load": {
            const {item} = message[1];
            return {...model, item};
        }
        case "products/request": {
            if (model.products) return model;
            return [
                {...model, products: []},
                requestProducts(user)
                    .then((products) => ["products/load", {products}])
            ];
        }
        case "products/load": {
            const {products} = message[1];
            return {...model, products};
        }
        case "profile/request": {
            const {userid} = message[1];
            return [
                model,
                requestProfile(message[1], user)
                    .then((profile) => ["profile/load", {userid, profile}])
            ];
        }
        case "profile/load": {
            const {profile} = message[1];
            return {...model, profile};
        }
        case "profile/save": {
            const {userid, profile} = message[1];
            const callbacks = message[2];
            return [
                {...model, profile},
                saveProfile({userid, profile}, user, callbacks)
                    .then((savedProfile) => ["profile/load", {userid, profile: savedProfile}])
            ];
        }
        case "cart/request": {
            const {userid} = message[1];
            return [
                model,
                requestCart(message[1], user)
                    .then((cart) => ["cart/load", {userid, cart}])
            ];
        }
        case "cart/load": {
            const {cart} = message[1];
            return {...model, cart};
        }
        case "cart/add": {
            const {userid} = message[1];
            return [
                model,
                addToCart(message[1], user)
                    .then((cart) => ["cart/load", {userid, cart}])
            ];
        }
        case "cart/remove": {
            const {userid} = message[1];
            return [
                model,
                removeFromCart(message[1], user)
                    .then((cart) => ["cart/load", {userid, cart}])
            ];
        }
        case "cart/updateQuantity": {
            const {userid} = message[1];
            return [
                model,
                updateCartQuantity(message[1], user)
                    .then((cart) => ["cart/load", {userid, cart}])
            ];
        }
        default: {
            const unhandled: never = message[0];
            throw new Error(`Unhandled message "${unhandled}"`);
        }
    }
}

function requestItem(
    payload: { itemId: string },
    user: Auth.User
) {
    return fetch(`/api/potteryitems/${payload.itemId}`, {
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            throw "No Response from server";
        })
        .then((json: unknown) => {
            if (json) return json as PotteryItem;
            throw "No JSON in response from server";
        });
}

function requestProducts(user: Auth.User) {
    return fetch(`/api/potteryitems`, {
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            throw "No Response from server";
        })
        .then((json: unknown) => {
            if (json && Array.isArray(json)) return json as PotteryItem[];
            throw "No JSON in response from server";
        });
}

function requestProfile(
    payload: { userid: string },
    user: Auth.User
) {
    return fetch(`/api/profiles/${payload.userid}`, {
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            throw "No Response from server";
        })
        .then((json: unknown) => {
            if (json) return json as Profile;
            throw "No JSON in response from server";
        });
}

function saveProfile(
    msg: {
        userid: string;
        profile: Profile;
    },
    user: Auth.User,
    callbacks: {
        onSuccess?: () => void;
        onFailure?: (error: Error) => void;
    }
): Promise<Profile> {
    return fetch(`/api/profiles/${msg.userid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user)
        },
        body: JSON.stringify(msg.profile)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            throw new Error(`Failed to save profile for ${msg.userid}`);
        })
        .then((json: unknown) => {
            if (json) {
                if (callbacks.onSuccess) callbacks.onSuccess();
                return json as Profile;
            }
            throw new Error("No JSON in API response");
        })
        .catch((error: Error) => {
            if (callbacks.onFailure) callbacks.onFailure(error);
            throw error;
        });
}

function requestCart(
    payload: { userid: string },
    user: Auth.User
) {
    return fetch(`/api/cart/${payload.userid}`, {
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            throw "No Response from server";
        })
        .then((json: unknown) => {
            if (json && Array.isArray(json)) return json as CartItem[];
            throw "No JSON in response from server";
        });
}

function addToCart(
    payload: { userid: string; itemId: string; name: string; price: number; imgSrc: string },
    user: Auth.User
) {
    return fetch(`/api/cart/${payload.userid}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user)
        },
        body: JSON.stringify({
            itemId: payload.itemId,
            name: payload.name,
            price: payload.price,
            imgSrc: payload.imgSrc
        })
    })
        .then((response: Response) => {
            if (response.status === 200 || response.status === 201) return response.json();
            throw "No Response from server";
        })
        .then((json: unknown) => {
            if (json && Array.isArray(json)) return json as CartItem[];
            throw "No JSON in response from server";
        });
}

function removeFromCart(
    payload: { userid: string; itemId: string },
    user: Auth.User
) {
    return fetch(`/api/cart/${payload.userid}/${payload.itemId}`, {
        method: "DELETE",
        headers: Auth.headers(user)
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            throw "No Response from server";
        })
        .then((json: unknown) => {
            if (json && Array.isArray(json)) return json as CartItem[];
            throw "No JSON in response from server";
        });
}

function updateCartQuantity(
    payload: { userid: string; itemId: string; quantity: number },
    user: Auth.User
) {
    return fetch(`/api/cart/${payload.userid}/${payload.itemId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...Auth.headers(user)
        },
        body: JSON.stringify({quantity: payload.quantity})
    })
        .then((response: Response) => {
            if (response.status === 200) return response.json();
            throw "No Response from server";
        })
        .then((json: unknown) => {
            if (json && Array.isArray(json)) return json as CartItem[];
            throw "No JSON in response from server";
        });
}