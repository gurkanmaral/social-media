import express from "express"
import { getMessages,addMessage } from "../controllers/chat.js"

const router = express.Router()

router.get("/:senderId/:receiverId",getMessages)
router.post("/",addMessage)


export default router