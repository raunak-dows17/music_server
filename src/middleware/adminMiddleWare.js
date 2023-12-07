const adminMiddleware = (req, res, next) => {
    const user = req.user;

    if (user && user.username === "MusicAdmin" && user.email === "musicadmin@email.com") {
        next();
    } else {
        res.status(403).json({ message: "Access denied!" });
    }
};

module.exports = adminMiddleware;
