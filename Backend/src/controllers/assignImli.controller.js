import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { ImliData } from "../models/imli.model.js";
import { ImliAssign } from "../models/imliAssign.model.js";
import { localData } from "../models/local.model.js";


export const assignImli = asyncHandler(async (req, res) => {
  const { LocalID, assignedQuantity } = req.body;

  if (!LocalID) throw new ApiError(400, "LocalID is required");
  if (!assignedQuantity) throw new ApiError(400, "assignedQuantity is required");


  const alreadyAssigned = await ImliAssign.findOne({
    localID: LocalID,
    returned: false
  });

  if (alreadyAssigned) {
    throw new ApiError(
      400,
      "Imli already assigned and not yet returned"
    );
  }


  // 1️⃣ Check current stock
  const stock = await ImliData.findOne();
  if (!stock || stock.rawImliQuantity < assignedQuantity) {
    throw new ApiError(400, "Not enough imli in stock");
  }

  // 2️⃣ Reduce stock
  await ImliData.findOneAndUpdate(
    {},
    { $inc: { rawImliQuantity: -assignedQuantity } }
  );

  // 3️⃣ Get local info
  const local = await localData.findOne({LocalID});

  // 4️⃣ Create assignment record
  const assign = await ImliAssign.create({
    localID: local.LocalID,
    localName: local.LocalName,
    assignedQuantity,
    assignedBy: req.user.username, // admin or operator
    returned: false
  });

  return res.json(new ApiResponse(201, assign, "Imli assigned successfully"));
});
