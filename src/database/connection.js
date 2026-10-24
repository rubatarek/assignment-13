import moongose from "mongoose";


export const databaseConnection = async () => {
moongose.connect("mongodb://localhost:27017/sara7aAppC46").then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log("Database connection failed", err); 
})

   

}