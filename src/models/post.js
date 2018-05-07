import mongoose from 'mongoose';
import slug from 'slug';

const postSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    user: { type: String, required: true },
    body: String,
    tags: [{ type: String}],
    created_at: Date,
    updated_at: Date
});

// Custom methods
// ...

// Lifecycle callbacks
postSchema.pre('save', function(next) {
    // Slug
    this.slug = slug(this.title).toLowerCase();
    // Dates
    const curr = new Date();
    if (!this.created_at) {
        this.created_at = curr;
        this.updated_at = null;
    } else {
        this.updated_at = curr;
    }
    next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;