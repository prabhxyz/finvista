'use client';

import { MainStoreProvider } from '@/context/main-state-provider';
import { ThemeProvider, createTheme } from '@mui/material';

const AppContainer = ({ children }: any) => {
	const darkTheme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	return (
		<MainStoreProvider>
			<ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
		</MainStoreProvider>
	);
};

export default AppContainer;
