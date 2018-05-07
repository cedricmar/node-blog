import Post from '../models/post';

export default class PostController {

    async show(req, res) {
        const post = await Post.findOne({ slug: req.params.slug });
        res.json({
            post
        });
    }

}