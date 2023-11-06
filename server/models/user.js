import mongoose from 'mongoose';

const userScheema = mongoose.Schema({
	name: { type: String, required: true},
	email: { type: String, required: true },
	password: { type: String, required: true },
	id: { type: String }
})

const User = mongoose.model("User", userScheema)

export default User