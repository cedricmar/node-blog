
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/db';
import IndexController from './controllers/index';
import Post from './models/post';
import PostController from './controllers/post';

const app = express();
const router = express.Router();

// Middlewares
app.use(cors());
app.use(express.static('public'));

// Routes
router.get('/', (new IndexController()).index);
const postController = new PostController();
router.get('/posts/:slug', postController.show);

// Register routes
app.use('/', router);

// 404
app.use((req, res, next) => res.status(404).send('Page introuvable !'));

// Seed
Post.remove({}, async function(err) {
  await Post({
    title: 'A new post',
    user: 'admin',
    body: 'Some content',
    tags: ['test', 'titi']
  }).save()
});

// Start server
const port = process.env.PORT;
mongoose.connect(config.DB).then(conn => {
  app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
  });
});
