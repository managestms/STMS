import Settings from "../models/settings.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const saveSettings = asyncHandler(async (req, res) => {

  const data = req.body;

  // check if settings already exist
  let settings = await Settings.findOne();

  if (settings) {
    // update existing
    settings = await Settings.findByIdAndUpdate(
      settings._id,
      data,
      { new: true, runValidators: true }
    );
  }
  else {
    // create first time
    settings = await Settings.create(data);
  }

  return res.status(200)
    .json(new ApiResponse(200, settings, "Settings Saved Successfully"));

});

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.findOne();
  return res.status(200)
    .json(new ApiResponse(200, settings || {}, "Settings Fetched Successfully"));
});
