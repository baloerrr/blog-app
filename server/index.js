import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routerPosts from "./routes/posts.js";
import routerAuth from "./routes/auth.js";
import routerUser from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());

const upload = multer({dest: './uploads/'});

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json("image has uploaded");
})

app.use("/api/posts", routerPosts);
app.use("/api/auth", routerAuth);
app.use("/api/users", routerUser);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`);
})