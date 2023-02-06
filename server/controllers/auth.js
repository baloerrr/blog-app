import db from "../config/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = (req,res) => {
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        const query = "SELECT * FROM users WHERE email = ? OR username = ?";

        db.query(query, [email, username], (err,data) => {
            if(err) throw res.json({msg: err.message});
            if(data.length) return res.status(409).json("User already exist!");

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const query = `INSERT INTO users SET ?`;
            const values = {
                username: username, 
                email: email, 
                password: hash
            };

            db.query(query, values, (err, data) => {
                if(err) throw res.json({msg: err,message});
                return res.status(200).json("User has been created");
            });

        });
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const login = (req,res) => {
    try {
        const query = "SELECT * FROM users WHERE username = ?";

        db.query(query, [req.body.username], (err, data) => {
            if(err) throw res.json(err.message);
            if(data.length === 0) return res.status(404).json("User not found!");

            const isCorrectPassword = bcrypt.compareSync(req.body.password, data[0].password);
            if(!isCorrectPassword) return res.status(400).json("Wrong Password or Username!");

            const token = jwt.sign({id: data[0].id}, process.env.SECRET_KEY);

            const { password, ...other } = data[0];
 
            res.cookie("access_token", token , {
                httpOnly: true,
            }).status(200).json({...other});
           
        });

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const logout = (req,res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out")
}

export { register, login, logout };