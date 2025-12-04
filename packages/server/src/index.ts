// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import PotteryItem from "./services/potteryitem-svc";
import fs from "node:fs/promises";
import path from "path";

import potteryitems from "./routes/potteryitems";
import profiles from "./routes/profiles";
import cart from "./routes/cart";
import auth, { authenticateUser } from "./routes/auth";

connect("cp-pottery"); // use your own db name here

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/potteryitems", authenticateUser, potteryitems);
app.use("/api/profiles", authenticateUser, profiles);
app.use("/api/cart", authenticateUser, cart);
app.use("/auth", auth);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.get("/potteryitem/:itemId", (req: Request, res: Response) => {
    const { itemId } = req.params;

    PotteryItem.get(itemId).then((data) => {
        if (data) res
            .set("Content-Type", "application/json")
            .send(JSON.stringify(data));
        else res
            .status(404).send();
    });
});

app.use("/app", (req: Request, res: Response) => {
    const indexHtml = path.resolve(staticDir, "index.html");
    fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
        res.send(html)
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});