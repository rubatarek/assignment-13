import joi from "joi"
import {BadRequestException} from "../response/error.response.js"


export const validation=(schema)=>{
return (req,res,next)=>{
let {value, error}=schema.validate(req.body,{abortEarly:false})
console.log(value,error)
if(error){
    BadRequestException({message:"validation error", extra:error})
}//lw fe moshkla hena hytl3ha men abl ma yd5ol database bt3ty

next()

}
}