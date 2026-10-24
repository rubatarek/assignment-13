
import mongoose from "mongoose";
   

const userSchema = new mongoose.Schema({

name: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
    unique: true,
},
phone:{
   type: String,
    
},
password: {
    type: String,
    required: function(){
        return this.provider === "system" // 3shan ely 3ndo provider system y7tag password w ely 3ndo google msh hay7tag password
    },
    // badl true ha5leh yshel function 
},
coverImage: {
    type: String,
},
profilePicture: {
    type: String,
},
uniqueAccName:{
    type: String,
    required: function(){
        return this.provider === "system"
    },
    // hena bardo ha5leha function 
    unique: true,
},
role: {
    type: Number,
    default: 0, // 0 for user, 1 for admin
},
isVerified: {
    type: Boolean,
    default: false
},
otp: {
    type: String,
},
isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    provider:{
        type: String,
        enum:["system", "google"],
    default: "system"
    //a3rf use ely da5el ely 3ndo el account da mn google wla mn el system
    }


})

const userModel = mongoose.model("users", userSchema);

export default userModel;