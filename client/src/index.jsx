import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@mui/material';
import { AuthContextProvider } from './context/AuthContext';
import { theme } from './config/Theme';

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
