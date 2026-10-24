import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve('./config/.env') });
const port= process.env.PORT 
const mood= process.env.MOOD
const salt= process.env.SALT
const adminSignature= process.env.ADMIN_SIGNATURE
const userSignature= process.env.USER_SIGNATURE
const adminRefreshSignature= process.env.ADMIN_REFRESH_TOKEN
const userRefreshSignature= process.env.USER_REFRESH_TOKEN
const googleAppPassword= process.env.GOOGLE_APP_PASSWORD
const googleAccountEmail= process.env.GOOGLE_ACCOUNT_EMAIL
const serverURL= process.env.SERVER_URI
const redisURL= process.env.REDIS_URL
export const env={
    port,
    mood,
    salt,
    adminSignature,
    userSignature,
    adminRefreshSignature,
    userRefreshSignature,
    googleAppPassword,
    googleAccountEmail,
    serverURL,
    redisURL
}