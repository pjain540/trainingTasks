// models/unit.model.ts
import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema({
    name: String,
    currentOwner: String,
    isPublic: Boolean,
});

export const Unit = mongoose.model("Unit", UnitSchema);