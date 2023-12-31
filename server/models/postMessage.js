import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
	title: String,
	message: String,
	creator: String,
	name: String,
	tags:{type: [String], required: false},
	selectedFile: String,
	likeCount: {
		type: [String],
		default: []
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage