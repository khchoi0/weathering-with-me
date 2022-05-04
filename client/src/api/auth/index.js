import { AxiosInstance } from '../../utils/AxiosInstance';

export const loginCall = async (userInfo, dispatch, isError = false) => {
	dispatch({ type: 'LOGIN_BEGIN' });
	try {
		const result = await AxiosInstance.post('/api/auth/login', userInfo).catch(
			(error) => {
				console.log(error.response.data.message);
				isError = true;
			},
		);
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

export const registerCall = async (userInfo, dispatch, isError = false) => {
	dispatch({ type: 'REGISTER_BEGIN' });
	try {
		const result = await AxiosInstance.post('/api/auth/register', userInfo).catch(
			(error) => {
				console.log(error.response.data.message);
				isError = true;
			},
		);
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
