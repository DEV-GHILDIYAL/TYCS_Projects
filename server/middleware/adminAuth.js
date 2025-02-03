// const admin = (req, res, next) => {
//     // if (req.isAuthenticated() && req.user.role === 'admin') {
//     if (req.user.role === 'admin') {
//         console.log(req.user.role);
//         return next();
//     }
//     return res.redirect('/');
// };

// export default admin;

const admin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ error: "Access Denied: Admins only" });
    }
    next();
};

export default admin;
