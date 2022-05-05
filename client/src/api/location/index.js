import { AxiosInstance } from '../../utils/AxiosInstance';
import axios from 'axios';
import { WEATHER_KEY } from '../../config/Config';

export const getAllLocations = async () => {
	try {
		const result = await AxiosInstance.get('/api/loc/read');
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getWeatherDataByLocname = async (locName) => {
	try {
		const result = await axios.get(
			`http://api.weatherapi.com/v1/current.json?key=${WEATHER_KEY}&q=${locName}&aqi=no`,
		);
		return result;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
