import { createTheme } from '@mui/material';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#68A7AD',
			light: '#76c0c7',
			dark: '#51969c',
			contrastText: '#FFFFFF',
		},
		secondary: {
			main: '#99C4C8',
			light: '#a1c5c9',
			dark: '#8ab8bd',
		},
		tertiary: {
			main: '#E5CB9F',
			light: '#e7d2ac',
			dark: '#ddc08d',
		},
		quaternary: {
			main: '#EEE4AB',
			light: '#eee5b8',
			dark: '#e0d389',
		},
		otherColor: {
			main: '#FFFFFF',
			dark: '#012530',
		},
	},
});
