import bcrypt from 'bcrypt'

import { env } from '../../../../config/env.service.js'


export const hashData= async (data) => {

let encryptedData=await bcrypt.hash(data,  + env.SALT)
return encryptedData

}

export const verifyData= async (plainText, cypherText) => {

let isValid=await bcrypt.compare(plainText, cypherText)
return isValid

}

