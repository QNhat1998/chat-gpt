import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    try {
        console.log(token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        const userId = decoded.id;
        console.log(userId);
        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: "Not authorized, user not found" });
        }

        req.user = user;
        next()
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" })
    }

}
