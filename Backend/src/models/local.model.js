import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  localUPI: {
    type: String,
    default: "",
  },
  UPIQrcode: {
    type: String,
    default: "",
  },
  UPIAmount: {
    type: Number,
    default: 0,
  },
  cashAmount: {
    type: Number,
    default: 0,
  },
});

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
    payment: {
      type: paymentSchema,
      default: () => ({}),
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
  { timestamps: true }
);

export const localData = mongoose.model("localData", localSchema);
