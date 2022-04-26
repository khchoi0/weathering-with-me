export const loginBegin = () => ({
	type: 'LOGIN_BEGIN',
});

export const loginSuccess = (user) => ({
	type: 'LOGIN_SUCCESS',
	payload: user,
});

export const loginFailure = () => ({
	type: 'LOGIN_FAILURE',
});

export const registerBegin = () => ({
	type: 'REGISTER_BEGIN',
});

export const registerSuccess = (user) => ({
	type: 'REGISTER_SUCCESS',
	payload: user,
});

export const registerFailure = () => ({
	type: 'REGISTER_FAILURE',
});
