// src/routes/cart.ts
import express, { Request, Response } from "express";
import { CartItem } from "../models/cartitem";

import Cart from "../services/cart-svc";

const router = express.Router();

router.get("/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;

    Cart.getCart(userid)
        .then((cart: CartItem[]) => res.json(cart))
        .catch((err) => res.status(500).send(err));
});

router.post("/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;
    const { itemId, name, price, imgSrc } = req.body;

    Cart.addItem(userid, itemId, name, price, imgSrc)
        .then((cart: CartItem[]) => res.status(201).json(cart))
        .catch((err) => res.status(500).send(err));
});

router.put("/:userid/:itemId", (req: Request, res: Response) => {
    const { userid, itemId } = req.params;
    const { quantity } = req.body;

    Cart.updateQuantity(userid, itemId, quantity)
        .then((cart: CartItem[]) => res.json(cart))
        .catch((err) => res.status(500).send(err));
});

router.delete("/:userid/:itemId", (req: Request, res: Response) => {
    const { userid, itemId } = req.params;

    Cart.removeItem(userid, itemId)
        .then((cart: CartItem[]) => res.json(cart))
        .catch((err) => res.status(500).send(err));
});

export default router;
