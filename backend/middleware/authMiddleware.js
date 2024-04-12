import jwt from 'jsonwebtoken';

const sec=process.env.JWT_SECRET || "abhay";

export const verifyToken = (req, res, next) => {
    const token = req.params.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, sec);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.userId = decoded.id; // Attach userId to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};