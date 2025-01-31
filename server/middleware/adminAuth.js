const admin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        console.log(req.user.role);
        return next();
    }
    return res.redirect('/');
};

export default admin;
