import { AxiosInstance } from '../../utils/AxiosInstance';

// Used for login page
export const loginCall = async (userInfo, dispatch, isError = false) => {
	dispatch({ type: 'LOGIN_BEGIN' });
	try {
		const result = await AxiosInstance.post('/api/auth/login', userInfo).catch((error) => {
			console.log(error.response.data.message);
			isError = true;
		});
		if (isError) {
			return true;
		}
		dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
	} catch (error) {
		dispatch({ type: 'LOGIN_FAILURE', payload: error });
		console.log(error);
		throw error;
	}
};

// Used for register page
export const registerCall = async (userInfo, dispatch, isError = false) => {
	dispatch({ type: 'REGISTER_BEGIN' });
	try {
		const result = await AxiosInstance.post('/api/auth/register', userInfo).catch((error) => {
			console.log(error.response.data.message);
			isError = true;
		});
		if (isError) {
			return true;
		}
		dispatch({ type: 'REGISTER_SUCCESS', payload: result.data });
	} catch (error) {
		dispatch({ type: 'REGISTER_FAILURE', payload: error });
		console.log(error);
		throw error;
	}
};

export const readUser = async () => {
	try {
		const result = await AxiosInstance.post('/api/auth/read');
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const createUser = async (username, password) => {
	try {
		const result = await AxiosInstance.post('/api/auth/register', {
			username: username,
			password: password,
		});
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const deleteUser = async (username) => {
	try {
		const result = await AxiosInstance.delete(`/api/auth/delete/${username}`);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updateUser = async (oldUsername, newUsername, newPassword) => {
	try {
		const result = await AxiosInstance.put('/api/auth/update', {
			oldUsername: oldUsername,
			newUsername: newUsername,
			password: newPassword,
		});
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
