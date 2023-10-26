import * as api from '../api'
import * as ACTION from '../constants/actionTypes.js'

export const getPosts = () =>  async (dispatch) => {
	try {
		const { data } = await api.fetchPosts()

		dispatch({ type: ACTION.FETCH_ALL, payload: data })
	} catch (error) {
		console.log(error)
	}
}

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post)

		dispatch({ type: ACTION.CREATE, payload: data})
	} catch (error) {
		console.log(error)
	}
}

export const updatePost = (id, postData) => async (dispatch) => {
	try {
		const { data } = await api.updatePost(id, postData)

		dispatch({type: ACTION.UPDATE, payload: data})
	} catch (error) {
		console.log(error)
	}
}

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id)

		dispatch({type: ACTION.DELETE, payload: id})
	} catch (error) {
		console.log(error)
	}

}