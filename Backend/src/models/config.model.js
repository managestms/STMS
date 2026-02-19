import mongoose, { Schema } from "mongoose";

const configSchema = new Schema({
    price_per_cleaned_imli: {
        type: Number,
        default: 15,
    },
}, { timestamps: true });

export const Config = mongoose.model("Config", configSchema);