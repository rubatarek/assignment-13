import userModel from "../../database/model/user.model.js"
import messageModel from "../../database/model/message.model.js"
import { NotFoundException,ConflictException,BadRequestException } from "../../common/response/error.response.js";
import {env} from "../../../config/env.service.js"

export const sendMessage= async (data,file) => {
let{receiverId, content}=data
//3ayza at2kd ely hab3tlo da mawgood fe userModel wala
let existedUser=await userModel.findById(receiverId)
if(!existedUser){
  throw new NotFoundException({message: "user not found"})
}
const image=''
if(file){
image=`${env.serverURL}/uploads/${file.filename}`


}
let addedMessage=await messageModel.insertOne({receiverId, content, image})
if(!addedMessage){
    throw new BadRequestException({message: "something went wrong"})
}
return addedMessage
}


export const getAllMessages= async (userId) => {
let messagesData=await messageModel.find({receiverId: userId})
if(messagesData.length>0){
return messagesData
}
else{
    throw new BadRequestException({message: "No messages found"})
}

}

export const deleteMessage= async (messageId, userId) => {

let deleteMessage=await messageModel.findById({_id: messageId, receiverId: userId})

if(!deleteMessage){
    throw new BadRequestException({message: "Message not found or you are not authorized to delete this message"})
}
return {message: "Message deleted successfully"}


}