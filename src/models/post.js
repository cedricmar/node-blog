import mongoose from 'mongoose';
import slug from 'slug';

// Schema
const postSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    user: { type: String, required: true },
    body: String,
    tags: [{ type: String}],
    created_at: Date,
    updated_at: Date
});

const Post = mongoose.model('Post', postSchema);

// Custom methods


// Lifecycle callbacks
postSchema.pre('save', function(next) {
    // Slug
    this.slug = slug(this.title).toLowerCase();
    // Dates
    this.created_at = new Date();
    this.updated_at = null;
    next();
});

Post.preUpdate = function(updateObj) {
    // Slug
    if (updateObj.title) {
        updateObj.slug = slug(updateObj.title).toLowerCase();
    }
    // Updated at
    updateObj.updated_at = new Date();
    return updateObj;
};

export default Post;
