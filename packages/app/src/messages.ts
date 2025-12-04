// app/src/messages.ts
import {PotteryItem, Profile, CartItem} from "server/models";

export type Msg =
    | ["item/request", { itemId: string }]
    | ["products/request", {}]
    | ["profile/request", { userid: string }]
    | ["profile/save",
    {
        userid: string;
        profile: Profile;
    },
    {
        onSuccess?: () => void;
        onFailure?: (error: Error) => void;
    }
]
    | ["cart/request", { userid: string }]
    | ["cart/add", { userid: string; itemId: string; name: string; price: number; imgSrc: string }]
    | ["cart/remove", { userid: string; itemId: string }]
    | ["cart/updateQuantity", { userid: string; itemId: string; quantity: number }]
    | Cmd;

type Cmd =
    | ["item/load", { itemId: string; item: PotteryItem }]
    | ["products/load", { products: PotteryItem[] }]
    | ["profile/load", { userid: string; profile: Profile }]
    | ["cart/load", { userid: string; cart: CartItem[] }];