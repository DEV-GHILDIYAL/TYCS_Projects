import { jwt } from "jsonwebtoken";

const userAUth = async (req, res, next) =>{
    const {token} = req.cokkies;

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