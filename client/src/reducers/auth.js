import * as ACTION from '../constants/actionTypes.js'

const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case ACTION.AUTH:
			localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
			return { ...state, authData: action?.payload }
		case ACTION.LOGOUT:
			localStorage.clear()

			return { ...state, authData: null }
		default:
			return state;
	}
}
export default authReducer