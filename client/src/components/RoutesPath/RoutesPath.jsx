import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Main } from '../Main/Main';
import { Login } from '../Auth/Login/Login';
import { Register } from '../Auth/Register/Register';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export const RoutesPath = () => {
	const { user } = useContext(AuthContext);

	return (
		<Router>
			<Routes>
				<Route path='/' element={user ? <Main /> : <Login />} />
				<Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
				<Route path='/register' element={user ? <Navigate to='/' /> : <Register />} />
			</Routes>
		</Router>
	);
};
