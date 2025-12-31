import mongoose, { Schema } from "mongoose";

const localSchema = new Schema(
  {
    LocalID: {
      type: Number,
      required: true,
    },
    LocalName: {
      type: String,
      required: true,
    },
    LocalAddress: {
      type: String,
      required: true,
    },
    LocalPhone: {
      type: Number,
      required: true,
    },
    LocalUPI: {
      type: String,
      required: true,
    },
    totalAssignedQuantity: {
      type: Number,
      default: 0,
    },
    totalReturnedQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamp: true }
);

export const localData = mongoose.model("localData", localSchema);
