const mongoose = require('mongoose')

const Post = mongoose.model('Post', {
    userId: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    likes: { type: Number },
    usersLiked: { type: [String] },
    created_at: { type: Date, required: true },
})

module.exports = { Post }