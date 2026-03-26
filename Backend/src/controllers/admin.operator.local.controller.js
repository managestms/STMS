import { localData } from "../models/local.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const return_local = asyncHandler(async (req, res) => {
    const locals = await localData.find();
    
    return res.status(200).json(
        new ApiResponse(
            200,
            locals,
            "Locals retrieved successfully"
        )
    );
});

const delete_local = asyncHandler(async (req, res) => {
    const { localId } = req.body;

    const local = await localData.findById(localId);
    if (!local) {
        throw new ApiError(404, "Local not found");
    }

    await local.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Local deleted successfully"
        )
    );
});

const update_local = asyncHandler(async (req, res) => {
    const { localId, LocalName, LocalPhone, LocalAddress, upiId } = req.body;

    const local = await localData.findById(localId);
    if (!local) {
        throw new ApiError(404, "Local not found");
    }

    if (LocalName) local.LocalName = LocalName;
    if (LocalPhone) local.LocalPhone = LocalPhone;
    if (LocalAddress) local.LocalAddress = LocalAddress;
    if (upiId !== undefined) local.upiId = upiId;

    await local.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            local,
            "Local updated successfully"
        )
    );
});

export { return_local, delete_local, update_local };