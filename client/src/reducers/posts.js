import * as ACTION from '../constants/actionTypes.js'

const postsReducer = (posts = [], action) => {
	switch (action.type) {
			case ACTION.FETCH_ALL:
				return action.payload
			case ACTION.CREATE:
				return [...posts, action.payload]
			case ACTION.UPDATE:
				return posts.map((post) => post._id === action.payload._id ? action.payload : post )
			case ACTION.LIKE_POST:
				return posts.map((post) => post._id === action.payload._id ? action.payload : post )
			case ACTION.DELETE:
				return posts.filter((post) => action.payload !== post._id)
			default:
				return posts;
		}
}
export default postsReducer