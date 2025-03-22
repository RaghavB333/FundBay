import mongoose from "mongoose";
import { type } from "os";
const {Schema,model} = mongoose

const userSchema = new Schema({
    email:{type:String, required:true},
    name:{type:String},
    username:{type:String,required:true},
    profilepic:{type:String},
    coverpic:{type:String},
    razorpayid:{type:String},
    razorpaysecret:{type:String},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})



export default mongoose.models.User || model("User",userSchema)