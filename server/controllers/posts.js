import PostMessage from '../models/postMessage.js'
import mongoose from "mongoose";

export const getPosts = async (req, res)=>{
	try{
		const postMessages = await PostMessage.find();

		return res.status(200).json(postMessages)

	} catch(error){
		return res.status(404).json({ message : error.message })
	}
}

export const createPost = async (req, res) => {
	const post = req.body

	const newPost = new PostMessage({ ...post, creator: req.userId })

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
	
	const post = await PostMessage.findById(id)

	if(!req.userId) return res.json({ message: "User not signed in"})
	
	if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id")

	const index = post.likeCount.findIndex((id) => id === String(req.userId))

	if(index === -1){
		post.likeCount.push(req.userId)
	}else{
		post.likeCount = post.likeCount.filter((id) => id !== String(req.userId))
	}

	const likedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
	res.status(200).json(likedPost)

}