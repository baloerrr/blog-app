import express from "express";
import { getPost, getPosts, addPost, updatePost, deletePost } from "../controllers/posts.js";
import verifyToken from "../middlewares/verify.js";

const router = express.Router();

router.get('/',verifyToken, getPosts);
router.get('/:id',verifyToken, getPost);
router.post('/',verifyToken, addPost);
router.put('/:id',verifyToken, updatePost);
router.delete('/:id',verifyToken, deletePost);



export default router;