import jwt from 'jsonwebtoken';
import "dotenv/config";

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    const secretKey = process.env.AUTH_SECRET_KEY;

    if (!token) {
        return res.status(401).json({
            message: "You cannot access this operation without a token!",
        });
    }

    console.log(secretKey);

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token provided!" });
        }

        req.user = decoded;
        next();
    });

};

export default authMiddleware;