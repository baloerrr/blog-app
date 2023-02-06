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
    const query = 'INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)'

    const values = [
        req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.date,
        user.id
    ]

    db.query(query, [values], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.json("Post has been created.");
    })
}

const updatePost = (req,res) => {
    const postId = req.params.id
    const q =
    "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

  db.query(q, [...values, postId, user.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been updated.");
  });
}

const deletePost = (req,res) => {
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, user.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
}

export { getPosts, getPost, addPost, updatePost, deletePost }
