// src/services/cart-svc.ts
import { Schema, model } from "mongoose";
import { CartItem } from "../models/cartitem";

const CartItemSchema = new Schema<CartItem>(
    {
        userid: { type: String, required: true, trim: true },
        itemId: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true },
        imgSrc: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 }
    },
    { collection: "cart_items" }
);

const CartItemModel = model<CartItem>(
    "CartItem",
    CartItemSchema
);

function getCart(userid: string): Promise<CartItem[]> {
    return CartItemModel.find({ userid });
}

function addItem(
    userid: string,
    itemId: string,
    name: string,
    price: number,
    imgSrc: string
): Promise<CartItem[]> {
    return CartItemModel.findOne({ userid, itemId })
        .then((existingItem) => {
            if (existingItem) {
                return CartItemModel.findOneAndUpdate(
                    { userid, itemId },
                    { $inc: { quantity: 1 } },
                    { new: true }
                );
            } else {
                const newItem = new CartItemModel({
                    userid,
                    itemId,
                    name,
                    price,
                    imgSrc,
                    quantity: 1
                });
                return newItem.save();
            }
        })
        .then(() => getCart(userid));
}

function removeItem(userid: string, itemId: string): Promise<CartItem[]> {
    return CartItemModel.findOneAndDelete({ userid, itemId })
        .then(() => getCart(userid));
}

function updateQuantity(
    userid: string,
    itemId: string,
    quantity: number
): Promise<CartItem[]> {
    if (quantity <= 0) {
        return removeItem(userid, itemId);
    }

    return CartItemModel.findOneAndUpdate(
        { userid, itemId },
        { quantity },
        { new: true }
    )
        .then(() => getCart(userid));
}

function clearCart(userid: string): Promise<void> {
    return CartItemModel.deleteMany({ userid }).then(() => {});
}

export default { getCart, addItem, removeItem, updateQuantity, clearCart };
