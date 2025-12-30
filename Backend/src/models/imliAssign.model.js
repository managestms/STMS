import mongoose from "mongoose";

const imliAssignSchema = new mongoose.Schema(
  {
    localID: {
      type:String,
      required: true
    },
    localName: {
      type: String,
      required: true
    },
    assignedQuantity: {
      type: Number,
      required: true
    },
    assignedBy: {
      type: String, 
      required: true
    },
    returned: {
      type: Boolean,
      default: true     // 🔴 IMPORTANT
    }
  },
  { timestamps: true }
);

export const ImliAssign = mongoose.model(
  "ImliAssign",
  imliAssignSchema
);
