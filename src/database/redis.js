import { createClient } from "redis"
import { env } from "../../config/env.service.js"

 export const client = createClient({
  url: env.redisURL
});


export const redisConnection =async () =>{

try{

client.on("error", function(err) {
  throw err;
});
await client.connect()
// await client.set('foo','bar');
console.log("Redis connected successfully")
}catch(error){
    console.log("Redis connection failed",error)
}
}

// Disconnect after usage
// await client.disconnect();
