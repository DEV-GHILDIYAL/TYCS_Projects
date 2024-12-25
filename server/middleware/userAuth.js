import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) =>{
    const {token} = req.cookies;

    if(!token){
        return res.json({success: false, message:"Not Authorized Login Again"});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({success: false, message: "Not Authorized Login Again"});
        }
        next();

    } catch (error) {
        
    }
}

export default userAuth;

// const authenticate = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: 'Token not provided' });
//     }
//     try {
//         const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         req.user = user;
//         next();
//     } catch (err) {
//         console.error("Token verification error:", err);
//         return res.status(403).json({ message: 'Token is not valid' });
//     }
// };
