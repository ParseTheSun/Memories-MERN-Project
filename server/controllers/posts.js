import PostMessage from '../models/postMessage.js'
import mongoose from "mongoose";

export const getPosts = async (req, res)=>{
	try{
		const postMessages = await PostMessage.find();

		res.status(200).json(postMessages)

	} catch(error){
		res.status(404).json({ message : error.message })
	}
}

export const createPost = async (req, res) => {
	const post = req.body

	const newPost = new PostMessage(post)

	try{
		await newPost.save()

		res.status(201).json(newPost)

	} catch(error){
		res.status(409).json({ message: error.message })
	}
}

export const updatePost = async (req, res) => {
		const post = req.body
		const { id } = req.params

		if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

		const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
		res.status(200).json(updatedPost)
}

export const deletePost = async(req, res) => {
	const id = req.params.id
	
	if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Post doesn't exist or has already beed delted")
	
	await PostMessage.findByIdAndDelete(id)
	
	res.status(200).json({ message: "Post deleted successfully" })
}

export const likePost = async(req, res) => {
	const { id } = req.params
	const post = req.body

	if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

	const likedPost = await PostMessage.findByIdAndUpdate(id, { ...post, likeCount: ++post.likeCount }, { new: true })
	res.status(200).json(likedPost)

}