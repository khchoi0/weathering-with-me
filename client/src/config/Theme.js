import { createTheme } from '@mui/material';

// Used for Material UI component color
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
			dark: '#e2ab4d',
		},
		quaternary: {
			main: '#EEE4AB',
			light: '#eee5b8',
			dark: '#dbcd7c',
		},
		quinary: {
			main: '#F55353',
		},
		otherColor: {
			main: '#FFFFFF',
			dark: '#012530',
		},
	},
});
