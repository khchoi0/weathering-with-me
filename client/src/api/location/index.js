import { AxiosInstance } from '../../utils/AxiosInstance';

export const getAllLocations = async () => {
	try {
		const result = await AxiosInstance.get('/api/loc/read');
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
