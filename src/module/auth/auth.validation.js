
import joi from "joi"

export const signupSchema=joi.object({
//onject of type joi with these fields
name:joi.string().optional().min(3).max(30).pattern(/^[a-zA-Z0-9_]+$/),
phone:joi.string().optional(),
email:joi.string()/*.email().*/.required(),
password:joi.string().required() //.pattern((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)),
,uniqueAccName:joi.string().required(),

})
export const loginSchema=joi.object({
email:joi.string().email().required(),
password:joi.string().required(),//.pattern((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)),
})
