// app/src/model.ts
import {PotteryItem, Profile, CartItem} from "server/models";

export interface Model {
    item?: PotteryItem;
    products?: PotteryItem[];
    profile?: Profile;
    cart?: CartItem[];
}

export const init: Model = {};