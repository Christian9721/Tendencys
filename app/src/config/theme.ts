import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
declare module '@mui/material/styles' {
	interface Palette {
		blue: Palette['primary'];
		yellow: Palette['primary'];
	}

	interface PaletteOptions {
		blue?: PaletteOptions['primary'];
		yellow?: PaletteOptions['primary'];
	}
}
const theme = createTheme(
	{
		palette: {
			primary: {
				main: '#16a3df',
				dark: '#212E74',
				contrastText: '#FFF',
			},
			secondary: {
				main: '#0984c0',
				dark: '#1d7ad6',
			},
			success: {
				main: '#00d090',
				dark: '#079531',
				light: '#D0F0C9',
				contrastText: '#ffffff',
			},
			warning: {
				main: '#dfa916',
				dark: '#E35700',
				light: '#FAE295',
				contrastText: '#FFA800',
			},
			error: {
				main: '#fb3838',
				dark: '#DD0528',
				light: '#FFE2E5',
			},
			info: {
				main: '#16a3df',
				light: '#EEFAFA',
				dark: '#283990',
				contrastText: '#ffffff',
			},
			background: {
				default: '#f8f8f8',
			},
			grey: {
				'200': '#CBCBCB',
			},
		},
	},
	esES
);

export const themBackdrop = createTheme({
	components: {
		MuiBackdrop: {
			styleOverrides: {
				root: {
					zIndex: 99999,
					backgroundColor: 'rgba(0,0,0,0.6)',
				},
			},
		},
	},
});

export default theme;
