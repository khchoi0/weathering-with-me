import { AxiosInstance } from "../../utils/AxiosInstance";

export const getLocComment = async (lid) => {
  try {
    const result = await AxiosInstance.get("/api/comment/read");
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createLocComment = async (locname, username, content) => {
	try {
		const result = await AxiosInstance.post('/api/comment/create', {
			locname: locname,
			username: username,
			content: content,
		});
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
