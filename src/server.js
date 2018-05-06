
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

app.use(express.static('public'));

router.get('/', (req, res) => res.send('Hello World!'));

router.get('/user/:name', (new IndexController()).index);

app.use('/', router);

app.use((req, res, next) => res.status(404).send('Page introuvable !'));

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

