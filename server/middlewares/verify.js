import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if(!token) return res.status(401).json("You're not authenticated");
        
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({msg: 'Token is not valid', err});
            req.user = user
            next();
        })   
    } catch (error) {
        res.json(error.message)
    }
}

export default verifyToken;