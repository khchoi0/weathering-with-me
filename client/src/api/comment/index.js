import { AxiosInstance } from '../../utils/AxiosInstance';

export const createLocComment = async (lid, uid, content) => {
	try {
		const result = await AxiosInstance.post('/api/comment/create', {
			lid: lid,
			uid: uid,
			content: content,
		});
		return result;
	} catch (error) {
		console.log(error);
		throw error;
  }
};

export const getLocComment = async (lid) => {
	try {
		const result = await AxiosInstance.get(`/api/comment/read/${lid}`);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
