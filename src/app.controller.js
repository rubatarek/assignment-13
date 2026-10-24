import express from "express";
import { ConflictException,globalHandlingError,ErrorResponse,BadRequestException,NotFoundException } from "./common/response/error.response.js";
import { env } from "../config/env.service.js";
import { SuccessResponse } from "./common/response/success.response.js";
import { hashData,verifyData } from "./common/middleware/security/encryption.js";
import{databaseConnection} from "./database/connection.js"
import authRouter from "./module/auth/auth.controller.js"
import userRouter from "./module/user/user.controller.js"
import path from "path";
import{fileURLToPath} from "url"
// url de already mawgooda 3ndna nazla already 
import { redisConnection } from "./database/redis.js";
import {get, set } from "./database/redis.service.js";
import messageRouter from "./module/message/message.controller.js"
import cors from "cors";


export const bootstrap = async () => {

await redisConnection();

 const app = express();
 app.use(cors({
  // ay haga 3ady 
    origin: "*",
    
  }));
  // cors eno y7dd fe backend ay origin y2dr yklmo
app.use(express.json());
await databaseConnection();

const __filename = fileURLToPath(import.meta.url);
// url bt3 server aw destinantion ely wa2fa feha 

const __dirname = path.dirname(__filename);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/messages", messageRouter);
const data =await get('test')
console.log(data)
//lazem ageeb dir w a3ml concate 3leh be folder ely feh sora 
//3shan a2dr a3rd sora ba3d ma hatetha fe el server 
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // barg3 haga static fe res ely heya sora
//w barg3 directory ely fe el sora
// 3shan ama a7ot link fe browser ytla3 el sora

app.get('/check-health', (req, res) => {
res.json({message: "Server is healthy"});
})

// app.get('/test', (req, res) => {
//     SuccessResponse({
//         res,
//         message :"done from sucess response",
//         status: 201,
//         data: {name: "sohaila", age: 22}

//     });
//     // NotFoundException({message: "This is a test error"})
//     res.json({message: "Test api", data});
// })



// await set ({key:"age", value:"20", ttl:60})
set ({key:"hello",value:"world", ttl:60})

app.use('{*dummy}', (req, res) => {
res.json({message: "Route not found"});
})
//global handler error
// app.use((err, req, res, next) => {
//     console.error(err);
// res.json({message: "Something went wrong", data: err.message});
// })
app.use(globalHandlingError);

app.listen(env.port, () => {
    console.log("Server is running ");
});

}