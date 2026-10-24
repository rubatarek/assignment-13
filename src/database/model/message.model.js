import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        
    },
    content: {
        type: String,
        required: true
    },
    image:{
        type: String,
    }
}, 
);

const messageModel = mongoose.model("message", messageSchema);

export default messageModel;