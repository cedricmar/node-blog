import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/db';
import DefaultController from './controllers/DefaultController';
import PostController from './controllers/PostController';

const port = process.env.PORT;
const app = express();
const router = express.Router();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );
app.use(cors());
app.use(express.static('public'));

// Routes
app.use('/', DefaultController);
app.use('/posts', PostController)

// 404 - 500
app.use((req, res, next) => res.status(404).send('Page introuvable !'));

app.use((err, req, res, next) => {
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
