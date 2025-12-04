// src/routes/profiles.ts
import express, { Request, Response } from "express";
import { Profile } from "../models/profile";

import Profiles from "../services/profile-svc";
import Credentials from "../services/credential-svc";

const router = express.Router();

router.get("/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;

    Profiles.get(userid)
        .then((profile: Profile) => res.json(profile))
        .catch((err) => res.status(404).send(err));
});

router.put("/:userid", (req: Request, res: Response) => {
    const { userid } = req.params;
    const { password, ...profileData } = req.body;

    Profiles.update(userid, profileData as Profile)
        .then((profile: Profile) => {
            if (password && password.trim() !== "") {
                return Credentials.updatePassword(userid, password)
                    .then(() => profile);
            }
            return profile;
        })
        .then((profile: Profile) => res.json(profile))
        .catch((err) => res.status(500).send(err));
});

export default router;
