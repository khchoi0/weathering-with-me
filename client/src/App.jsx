import { RoutesPath } from './components/RoutesPath/RoutesPath';
import { useEffect } from 'react';
import { AxiosInstance } from '../../utils/AxiosInstance';

const App = () => {

	// Initialize: wake server
	const init = async () => {
		try {
			const result = await AxiosInstance.get('/');
			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

	useEffect(() => {
		init();
	}, []);

	return <RoutesPath />;
};

export default App;
