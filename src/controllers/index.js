import Post from '../models/post';

export default class IndexController {

    async index(req, res) {

        const posts = await Post.find({});

        res.json({
            resource: 'homepage',
            posts: posts
        });
    }

}