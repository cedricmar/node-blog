import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';
import VerifyToken from '../middlewares/VerifyToken';
import User from '../models/User';

const router = express.Router();

// Login
router.post('/login', async (req, res, next) => {
    try {
        // Find user
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ auth: false, token: null });
        }
        // Check password
        const validPW = bcrypt.compareSync(req.body.password, user.password);
        if(!validPW) {
            return res.status(401).send({ auth: false, token: null });
        }
        // Generate token
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 84600 // 24 hours
        })
        res.json({ auth: true, token });
    } catch(err) {
        next(err);
    }
});

// Get logged in user object
router.get('/me', VerifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId, { password: 0 });
        if (!user) {
            res.status(404).json({ res: 'No user found.' });
        }
        res.json({ user });
    } catch(err) {
        res.status(500).send({
            auth: false, message: 'Failed to authenticate.'
        });
    }
});

// Register endpoint
router.post('/register', async (req, res, next) => {
    try {
        const hashedPW = bcrypt.hashSync(req.body.password, 8);

        const newUser = await User.create({
            email: req.body.email,
            name: req.body.name,
            password: hashedPW
        });

        // Create token
        const token = jwt.sign({ id: newUser._id }, config.secret, {
            expiresIn: 86400 // 24 hours
        })

        res.json({ auth: true, token });
    } catch(err) {
        next(err);
    }
});

export default router;
