import { AxiosInstance } from '../../utils/AxiosInstance';

export const addToFav = async (username, locationId) => {
	try {
		const result = await AxiosInstance.post('/api/user/addFav', {
			username: username,
			_id: locationId,
		});
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const removeFromFav = async (username, locationId) => {
	try {
		const result = await AxiosInstance.post('/api/user/removeFav', {
			username: username,
			_id: locationId,
		});
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const readFav = async (uid) => {
	try {
		const result = await AxiosInstance.get(`/api/user/readFav/${uid}`);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};


