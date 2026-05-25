import { User } from "../../db/schema";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization?.startsWith('Bearer ')
            ? req.headers.authorization.split(' ')[1]
            : req.cookies?.token;

        if (!token) {
            throw new ApiError('Unauthorized Request: No token provided', httpStatus.UNAUTHORIZED);
        }

        const decodedToken = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
        const users = await User.findOne({ ObjectId: decodedToken._id });

        if (!users || users.length === 0) {
            throw new ApiError('Invalid Access Token', httpStatus.UNAUTHORIZED);
        }

        req.user = users;
        next();
    } catch (error) {
        const statusCode = error instanceof ApiError ? error.statusCode : (error.name === 'JsonWebTokenError' ? 401 : 500);
        const message = error instanceof ApiError ? error.message : (error.name === 'JsonWebTokenError' ? 'Invalid token' : 'Internal Server Error');

        console.error('JWT Verification Error:', error.message || error);

        return res.status(statusCode).json({
            status: 'error',
            message
        });
    }
});