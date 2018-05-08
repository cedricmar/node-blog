import express from 'express';
import User from '../models/User';

const router = express.Router();

// List
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json({ users });
    } catch(err) {
        // return res.status(500).send("There was a problem finding the users.");
        next(err);
    }
});

// Show
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({ user });
    } catch(err) {
        next(err);
    }
});

// Create
router.post('/', async (req, res, next) => {
    try {
        const user = await User.create({
            email : req.body.email,
            name : req.body.name,
            password : req.body.password
        });
        res.json({ user });
    } catch(err) {
        next(err);
    }
});

// Update
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (user === null) {
            res.status(404).json({ res: 'User not found.' });
        }

        res.json({ user });
    } catch(err) {
        next(err);
    }
});

// Delete
router.delete('/:id', async (req, res, next) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ res: 'OK' });
    } catch(err) {
        next(err);
    }
});

export default router;
