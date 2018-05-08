
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/db';
import IndexController from './controllers/index';
import PostController from './controllers/post';

const port = process.env.PORT;
const app = express();
const router = express.Router();

// Middlewares
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());
app.use(express.static('public'));

// Routes
router.get('/', (new IndexController()).index);

const postController = new PostController();
router.get('/posts', postController.index);
router.get('/posts/:slug', postController.show);
router.post('/posts', postController.create);
router.put('/posts/:slug', postController.update);
router.delete('/posts/:slug', postController.delete);

// Register routes
app.use('/', router);

// 404
app.use((req, res, next) => res.status(404).send('Page introuvable !'));

// 500
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});

// Connect to mongo
mongoose.connect(config.DB).then(() => {
    // Start server
    app.listen(port, function () {
        console.log(`Example app listening on port ${port}!`);
    });
});
