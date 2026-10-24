import {client} from "./redis.js";


export const createRevokeToken=({userId,token}) =>{

    return `revokeToken::${userId}:${token}`
}

export const set = async ({key,value,ttl} = {} )=>{

    return await client.set (key,value, { EX: ttl });


}

export const get = async (key)  => {

    return await client.get (key);
}

export const ttl = async (key)  => {
return await client.ttl (key);

}

export const exist = async (key)  => {
    return await client.exists (key);


}
export const redis_delete = async (key)  => {
return await client.del (key);

}
export const mget = async (...keys)  => {

return await client.mGet (keys);

}
