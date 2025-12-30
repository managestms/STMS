import mongoose, { Schema } from "mongoose";

const imliSchema = new Schema({
    rawImliQuantity:{
        type:Number
    }
},{timestamp:true})

export const ImliData = mongoose.model("ImliData",imliSchema)
