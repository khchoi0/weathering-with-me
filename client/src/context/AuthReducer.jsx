export const AuthReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_BEGIN':
			return {
				user: null,
				isFetching: true,
				error: false,
			};
		case 'LOGIN_SUCCESS':
			return {
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'LOGIN_FAILURE':
			return {
				user: null,
				isFetching: false,
				error: true,
			};
		case 'REGISTER_BEGIN':
			return {
				user: null,
				isFetching: true,
				error: false,
			};
		case 'REGISTER_SUCCESS':
			return {
				user: action.payload,
				isFetching: false,
				error: false,
			};
		case 'REGISTER_FAILURE':
			return {
				user: null,
				isFetching: false,
				error: true,
			};
		default:
			return state;
	}
};
