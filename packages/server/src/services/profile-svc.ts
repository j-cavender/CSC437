// src/services/profile-svc.ts
import { Schema, model } from "mongoose";
import { Profile } from "../models/profile";

const ProfileSchema = new Schema<Profile>(
    {
        userid: { type: String, required: true, trim: true, unique: true },
        displayName: { type: String, required: true, trim: true },
        darkMode: { type: Boolean, default: false }
    },
    { collection: "user_profiles" }
);

const ProfileModel = model<Profile>(
    "Profile",
    ProfileSchema
);

function get(userid: string): Promise<Profile> {
    return ProfileModel.findOne({ userid })
        .then((profile) => {
            if (!profile) {
                return create({
                    userid,
                    displayName: userid
                });
            }
            return profile;
        })
        .catch((err) => {
            throw `${userid} Not Found`;
        });
}

function update(
    userid: string,
    profile: Profile
): Promise<Profile> {
    return ProfileModel.findOneAndUpdate(
        { userid },
        profile,
        { new: true, upsert: true }
    ).then((updated) => {
        if (!updated) throw `${userid} not updated`;
        else return updated as Profile;
    });
}

function create(json: Profile): Promise<Profile> {
    const profile = new ProfileModel(json);
    return profile.save();
}

function remove(userid: string): Promise<void> {
    return ProfileModel.findOneAndDelete({ userid }).then(
        (deleted) => {
            if (!deleted) throw `${userid} not deleted`;
        }
    );
}

export default { get, create, update, remove };
