// Run inside the api container :
// $ babel-node cli/seeder.js
// babel-cli might need to be installed globally

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../src/config/db'
import Post from '../src/models/Post';
import User from '../src/models/User';

(async () => {
    await mongoose.connect(config.DB)

    // Seed

    await User.remove({});
    const pw = bcrypt.hashSync('aze123', 8);
    await User({ email : 'maruejolcedric@gmail.com', name : 'Cédric Maruéjol', password : pw }).save();
    console.log('Users have been created.');

    await Post.remove({});
    await Post({ title: 'A new post', user: 'admin', body: 'Some content', tags: ['test', 'tito'] }).save();
    await Post({ title: 'Another post', user: 'admin', body: 'Some content 2', tags: ['test', 'toto'] }).save();
    await Post({ title: 'Another brick in the wall', user: 'admin', body: 'Lorem ipsum...', tags: ['tech', 'tick'] }).save();
    console.log('Posts have been created.');

    process.exit(0);
})();
