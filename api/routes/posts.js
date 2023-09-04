import express from "express"
import { addPosts, deletePost, getPosts, getProfilePosts, getSearchedPosts } from "../controllers/post.js"

const router = express.Router()

router.get("/",getPosts)
router.post("/",addPosts)
router.delete("/:id",deletePost)
router.get("/search/:searchTerm", getSearchedPosts)
router.get("/profile",getProfilePosts)


export default router