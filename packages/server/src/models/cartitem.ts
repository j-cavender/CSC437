// src/models/cartitem.ts
export interface CartItem {
    userid: string;
    itemId: string;
    name: string;
    price: number;
    imgSrc: string;
    quantity: number;
}
