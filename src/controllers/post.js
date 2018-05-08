import slug from 'slug';
import Post from '../models/post';

export default class PostController {

    async index(req, res, next) {
        try {
            const posts = await Post.find({});
            res.json({
                posts
            })
        } catch(err) {
            next(err);
        }
    }

    async show(req, res, next) {
        try {
            const post = await Post.findOne({ slug: req.params.slug });
            res.json({
                post
            });
        } catch(err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const post = await new Post(req.body).save();
            res.json({
                post
            });
        } catch(err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const updateObj = Post.preUpdate(req.body);

            const post = await Post.findOneAndUpdate(
                { slug: req.params.slug },
                updateObj,
                { new: true }
            );

            if (post === null) {
                res.status(404).json({res: 'Post not found.'});
            }

            res.json(post);
        } catch(err) {
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const post = await Post.findOne({ slug: req.params.slug })

            if (post === null) {
                res.status(404).json({res: 'Post not found.'});
            }

            await post.remove();

            res.json(post);
        } catch(err) {
            next(err);
        }
    }

}
