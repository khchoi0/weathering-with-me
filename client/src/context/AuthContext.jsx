import { createContext, useEffect, useReducer } from 'react';
import { AuthReducer } from './AuthReducer';

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem('weatherapp_user')) || null,
	isFetching: false,
	error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	// Store user token in localStorage
	useEffect(() => {
		// For the security resons, we delete the sensitive data
		if (state.user) {
			delete state.user.password;
			delete state.user.createdAt;
			delete state.user.updatedAt;
			delete state.user.__v;
		}

		localStorage.setItem('weatherapp_user', JSON.stringify(state.user));
	}, [state.user]);

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isFetching: state.isFetching,
				error: state.error,
				dispatch,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
