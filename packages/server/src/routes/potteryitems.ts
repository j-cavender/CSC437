// src/routes/potteryitems.ts
import express, { Request, Response } from "express";
import { PotteryItem } from "../models/potteryitem";

import PotteryItems from "../services/potteryitem-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
    PotteryItems.index()
        .then((list: PotteryItem[]) => res.json(list))
        .catch((err) => res.status(500).send(err));
});

router.get("/:itemId", (req: Request, res: Response) => {
    const { itemId } = req.params;

    PotteryItems.get(itemId)
        .then((potteryitem: PotteryItem) => res.json(potteryitem))
        .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
    const newPotteryItem = req.body;

    PotteryItems.create(newPotteryItem)
        .then((potteryitem: PotteryItem) =>
            res.status(201).json(potteryitem)
        )
        .catch((err) => res.status(500).send(err));
});

router.put("/:itemId", (req: Request, res: Response) => {
    const { itemId } = req.params;
    const newPotteryItem = req.body;

    PotteryItems.update(itemId, newPotteryItem)
        .then((potteryitem: PotteryItem) => res.json(potteryitem))
        .catch((err) => res.status(404).end());
});

router.delete("/:itemId", (req: Request, res: Response) => {
    const { itemId } = req.params;

    PotteryItems.remove(itemId)
        .then(() => res.status(204).end())
        .catch((err) => res.status(404).send(err));
});

export default router;