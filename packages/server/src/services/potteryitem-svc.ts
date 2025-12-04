// src/services/potteryitem-svc.ts
import { Schema, model } from "mongoose";
import { PotteryItem } from "../models/potteryitem";

const PotteryItemSchema = new Schema<PotteryItem>(
    {
        itemId: { type: String, required: true, trim: true },
        type: { type: String, required: true, trim: true },
        name: {type: String, required: true, trim: true },
        imgSrc: String,
        alt: String,
        width: String,
        price: Number,
        description: String
    },
    { collection: "pottery_item" }
);

const PotteryItemModel = model<PotteryItem>(
    "PotteryItem",
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

function update(
    itemId: String,
    potteryitem: PotteryItem
): Promise<PotteryItem> {
    return PotteryItemModel.findOneAndUpdate({ itemId }, potteryitem, {
        new: true
    }).then((updated) => {
        if (!updated) throw `${itemId} not updated`;
        else return updated as PotteryItem;
    });
}

function create(json: PotteryItem): Promise<PotteryItem> {
    const t = new PotteryItemModel(json);
    return t.save();
}

function remove(itemId: String): Promise<void> {
    return PotteryItemModel.findOneAndDelete({ itemId }).then(
        (deleted) => {
            if (!deleted) throw `${itemId} not deleted`;
        }
    );
}

export default { index, get, create, update, remove };