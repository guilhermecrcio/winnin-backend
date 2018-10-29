import mongoose from 'mongoose'

export const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, required: true },
    ups: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    externalId: { type: String, required: true },
    image: { type: String },
    url: { type: String, required: true }
})

export const PostModel = mongoose.model('Post', PostSchema)