import jwt from "jsonwebtoken";
import { User } from "../../db/schema.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.startsWith('Bearer ')
            ? req.headers.authorization.split(' ')[1]
            : req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized Request: No token provided'
            });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid Access Token'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        const statusCode = error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError' ? 401 : 500;
        const message = error.name === 'JsonWebTokenError' ? 'Invalid token' : (error.name === 'TokenExpiredError' ? 'Token expired' : 'Internal Server Error');

        console.error('JWT Verification Error:', error.message || error);

        return res.status(statusCode).json({
            status: 'error',
            message
        });
    }
};