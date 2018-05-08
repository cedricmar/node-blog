// Run inside the api container :
// $ babel-node cli/seeder.js
// babel-cli might need to be installed globally

import mongoose from 'mongoose';
import config from '../src/config/db'
import Post from '../src/models/post';

(async () => {
    await mongoose.connect(config.DB)

    // Seed
    await Post.remove({});

    await Post({ title: 'A new post', user: 'admin', body: 'Some content', tags: ['test', 'tito'] }).save();
    await Post({ title: 'Another post', user: 'admin', body: 'Some content 2', tags: ['test', 'toto'] }).save();
    await Post({ title: 'Another brick in the wall', user: 'admin', body: 'Lorem ipsum...', tags: ['tech', 'tick'] }).save();

    process.exit(0);
})();
