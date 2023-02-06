import db from "../config/connection.js";

const getPosts = (req,res) => {

    const query = req.query.cat 
    ? "SELECT * FROM posts WHERE cat=?" 
    : "SELECT * FROM posts";

    db.query(query, [req.query.cat], (err,data) =>{
        if(err) throw res.send(err.message);

        return res.status(200).json(data);
    })
}

const getPost = (req,res) => {
    
    const query = "SELECT `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?";

    db.query(query, [req.params.id], (err,data) => {
        if(err) throw res.json(err);

        return res.status(200).json(data[0]);
    })
}

const addPost = (req,res) => {
    
}

const updatePost = (req,res) => {
    
}

const deletePost = (req,res) => {
    // code auth token 

    // const postId = req.params.id;
    // const query = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    // db.query(query, [])
}

export { getPosts, getPost, addPost, updatePost, deletePost }