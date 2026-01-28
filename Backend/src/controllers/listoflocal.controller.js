import {localData} from "../models/local.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const return_local=asyncHandler(async(req , res)=>{
    const locals= await localData.find({});
    if(!locals){
        throw new ApiError(404,"No locals found");
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            locals,
            "Locals retrieved successfully"
        )
    );
})

const delete_local=asyncHandler(async(req , res)=>{
export {return_local};

