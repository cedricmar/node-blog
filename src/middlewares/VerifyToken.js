import jwt from 'jsonwebtoken';
import config from '../config';

export default async (req, res, next) => {
    try {
        // Get token
        const token = req.headers['x-access-token'];
        if (!token) {
            res.status(403).json({ auth: false, message: 'No token provided.' });
        }
        // Check token
        const decoded = await jwt.verify(token, config.secret);
        req.userId = decoded.id;
        next();
    } catch(err) {
        res.status(500).json({ auth: false, message: 'Could not authenticate.' });
    }
};
