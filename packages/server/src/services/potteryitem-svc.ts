// src/services/potteryitem-svc.ts
import { Schema, model } from "mongoose";
import { PotteryItem } from "../models/potteryitem";

const PotteryItemSchema = new Schema<PotteryItem>(
    {
        itemId: { type: String, required: true, trim: true },
        category: { type: String, required: true, trim: true },
        name: {type: String, required: true, trim: true },
        imgSrc: String,
        alt: String,
        width: String
    },
    { collection: "pottery_item" }
);

const PotteryItemModel = model<PotteryItem>(
    "Profile",
    PotteryItemSchema
);

function index(): Promise<PotteryItem[]> {
    return PotteryItemModel.find();
}

function get(itemId: String): Promise<PotteryItem> {
    return PotteryItemModel.find({ itemId })
        .then((list) => list[0])
        .catch((err) => {
            throw `${itemId} Not Found`;
        });
}

export default { index, get };