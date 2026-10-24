import{Router} from "express"
import {SuccessResponse} from "../../common/response/success.response.js"
import{auth} from "../../common/middleware/auth/auth.js"
import{getAllMessages,sendMessage,deleteMessage} from "./message.service.js"
import { upload } from "../../common/middleware/multer.js"

const router=Router()

router.post('/send-message',upload().single('image'), async (req, res) => {
let data=await sendMessage(req.body,req.file)
SuccessResponse({
    res,
    message: "Message sent successfully",
    data: data
})
})

router.get('/get-all-messages',auth, async (req, res) => {
let messagesData=await getAllMessages(req.user)
SuccessResponse({
    res,
    message: "messages retrieved",
    data: messagesData
})
})

router.delete('/delete-message/:messageId',auth, async (req, res) => {
let data=await deleteMessage(req.params.messageId, req.user)
SuccessResponse({
    res,
    message: "Message deleted successfully",
    data: data
})
})  





export default router