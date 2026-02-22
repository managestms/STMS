import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  businessName:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  gstin:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  stateCode:{
    type:String,
    required:true
  },
  phone:String
},{_id:false});   // important (prevents extra _id in nested object)


const settingsSchema = new mongoose.Schema({

  // ⭐ Seller / Business profile
  seller:{
    type:sellerSchema,
    required:true
  },

  

},{timestamps:true});

const Settings = mongoose.model("Settings",settingsSchema);

export default Settings;