
import express from 'express';
import mongo from 'mongodb';
import IndexController from './controllers/index';
import config from './config/db';

const app = express();
const router = express.Router();
const client = mongo.MongoClient;

client.connect(config.DB, (err, db) => {
  if(err) {
    console.log('database is not connected')
  }
  else {
      console.log('connected!!')
  }
});

router.get('/', (req, res) => res.send('Hello World!'));

router.get('/user/:name', (new IndexController()).index);

app.use('/', router);

app.use((req, res, next) => res.status(404).send('Page introuvable !'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

