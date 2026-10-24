import { generateToken,generateAccessToken,auth } from "../../common/middleware/auth/auth.js";
import { hashData,verifyData } from "../../common/middleware/security/encryption.js";
import { ConflictException,NotFoundException,BadRequestException } from "../../common/response/error.response.js";
import userModel from "../../database/model/user.model.js";
import joi from "joi"
import { sendEmail } from "../../common/utility/sendEmail.js";
import { set,get,createRevokeToken } from '../../database/redis.service.js';
import{OAuth2Client} from "google-auth-library"


export const signup= async (data) => {
    let{name, email, password,uniqueAccName,phone}=data
//destruct hagat reqiredd

let existedUser=await userModel.findOne({email})
if(existedUser){
    ConflictException({message: "Email already exists"})
}
let encryptedPassword=await hashData(password)
const otp = Math.floor(100000 + Math.random() * 900000);
let addedUser=await userModel.insertOne({name, email, password: encryptedPassword, uniqueAccName, phone, otp})
console.log(`otp:${addedUser._id}`)
let otpHashed=await hashData(otp.toString())
await set ({
    key:`otp:${addedUser._id}`,
    value:otpHashed,
    ttl: 60*5

})
await sendEmail({
    to: email ,
    subject: "verify your account",
    html:`<h1> verify/${uniqueAccName}"> verify your account, your otp is ${otp} </h1>`
})
return addedUser

}

 
export const signupMail=async(body) =>{
const client=new OAuth2Client()
const ticket = await client.verifyIdToken({
    idToken: body.idToken,
    audience:"110272923034-hgs0uaio1osg2pf2110bk7qprsennrab.apps.googleusercontent.com",
})
//google trod 3al ticket 
// afok el token ely gay meen google 
const payload = ticket.getPayload();
console.log(payload)
if(!payload.email_verified){
    throw new BadRequestException({message: "Email not verified by google"})
}
//ba3mlo verify 3shan a2dar a save it fe el database 
let {email, name}=payload
let existingUser=await userModel.findOne({email})
if(existingUser){
    throw new ConflictException({message: "User already exists"})
}
else{
let addedUser=await userModel.insertOne({provider:"google", name, email,isVerified:true})
if(addedUser){
    return "user added successfully"
}
else{
    return "something went wrong"
}

}
}

export const login= async (data, host) => {
let {email, password}=data
let userData=await userModel.findOne({email})
if(!userData){
    NotFoundException({message: "User not found"})  
}
let validPassword=await verifyData(password, userData.password)
if(!validPassword){
    BadRequestException({message: "Invalid password"})
}
    let{accessToken, refreshToken} =generateToken({userId: userData._id},host, userData.role)
    return {userData, accessToken, refreshToken}
}


export const verifyAccount= async (data) => {
const{email, otp}=data
const userData=await userModel.findOne({email})
// if(userData.otp != otp){
//     BadRequestException({message: "Invalid otp"})
// }
 let hashedOtp = await get(`otp:${userData._id}`)
let matchedOtp=await verifyData(otp, hashedOtp)
if(matchedOtp){
userData.verified=true
await userData.save()
return userData
}
else{
    BadRequestException({message: "Invalid otp"})
}
    // userData.isVerified=true
    // await userData.save()
    // userData.otp=null // myt3mlosh verify kazaa mara be same otp
    // await userData.save()
    // return userData
}

export const getAccessToken= async (authorization, host) => {

let accessToken=await generateAccessToken(authorization, host)
return accessToken

}

export const logout= async (req) => {
let redisKey= createRevokeToken({userId:req.user, token:req.token})
await set({
    key:redisKey,
    value: 1,   
    ttl: req.decoded.iat+ 30*60})
return {message: "User logged out successfully"}
}