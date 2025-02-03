import jwt from "jsonwebtoken";
const userAuth = async (req, res, next) => {
    // const { token } = req.cookies;
    const token = req.cookies?.token;
    // console.log(token);
    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode.id) {
            return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
        }

        req.user = { id: tokenDecode.id }; // Attach user information to req.user
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({ success: false, message: "Authentication failed. Please log in again." });
    }
};

export default userAuth;
