

import userModel from "../../database/model/user.model.js";
import { NotFoundException,ConflictException,BadRequestException } from "../../common/response/error.response.js";
import { hashData,verifyData } from "../../common/middleware/security/encryption.js";
import{env} from "../../../config/env.service.js"   

export const getUserData= async (userId) => {

let userData=await userModel.findById(userId)
if(!userData){
    NotFoundException({message: "User not found"})      
}
return userData
}

export const updateUserData= async (userId, data, file) => {
    console.log(file)
    let imageField=''
    if(file){
  imageField=`${env.serverURL}/${file.path}`
console.log(imageField, "from line 39")
}
let{name,password ,uniqueAccName,newPassword}=data
let userData=await userModel.findById(userId)
if(!userData){
    NotFoundException({message: "User not found"})      
}
let newHashedPassword=''
if(password){
   let comparedPassword= await verifyData(password, userData.password)
   if(comparedPassword){
     newHashedPassword=await hashData(newPassword)
   }  
   else{
    BadRequestException({message: "Invalid password"})
   }
}
let existingUniqueAccName=await userModel.findOne({uniqueAccName})
if(existingUniqueAccName){
    ConflictException({message: "Unique account name already exists"})
}

let updatedUserData=await userModel.findByIdAndUpdate(userId, {name, uniqueAccName, password: newHashedPassword,profilePicture: imageField}, {new: true})
return updatedUserData
}

export const deleteUser = async (userId) => {
    let user = await userModel.findById(userId);
    if (!user) {
        NotFoundException({ message: "User not found" });
    }

    if (user.isDeleted) {
        BadRequestException({ message: "User already deleted" });
    }

    user.isDeleted = true;
    user.isActive = false;
    await user.save();

    return user;
};

export const deactivateUser = async (userId) => {
    let user = await userModel.findById(userId);
    if (!user) {
        NotFoundException({ message: "User not found" });
    }

    if (!user.isActive) {
        BadRequestException({ message: "User already deactivated" });
    }

    user.isActive = false;
    await user.save();

    return user;
};
export const activateUser = async (userId) => {
    let user = await userModel.findById(userId);
    if (!user) {
        NotFoundException({ message: "User not found" });
    }

    if (user.isDeleted) {
        BadRequestException({ message: "Cannot activate a deleted account" });
    }

    if (user.isActive) {
        BadRequestException({ message: "User already active" });
    }

    user.isActive = true;
    await user.save();

    return user;
};

export const getUserDataByUName= async (params) => {
let {uniqueAccName}=params
let userData=await userModel.findOne({uniqueAccName})
if(!userData){
    NotFoundException({message: "User not found"})      
}
return userData



}