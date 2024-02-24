import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline, GlobalStyles, responsiveFontSizes } from '@mui/material';
import lightThemeOptions from './theme/lightThemeOptions';
// import createEmotionCache from "./helpers/createEmotionCache";
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './styles/sass/main.scss';

let lightTheme = createTheme(lightThemeOptions);

lightTheme = responsiveFontSizes(lightTheme);
// const emotionCache: EmotionCache = createEmotionCache();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		{/* <CacheProvider value={emotionCache}> */}
		<ThemeProvider theme={lightTheme}>
			<CssBaseline />
			<GlobalStyles
				styles={{
					'.html-content': {
						paddingLeft: 8,
						paddingRight: 8
					},
					'.html-content p': {
						backgroundColor: '#FFF9C4',
						padding: 8,
						margin: 0,
						marginBottom: 8
					},
					'.reservation-comment p': {
						margin: 0
					},
					'.MuiSnackbar-root': {
						right: '24px !important',
						left: '24px !important'
					},
					'.MuiButton-contained': {
						color: 'white'
					},
					'.MuiPaper-root-MuiSnackbarContent-root': {
						width: '100%'
					},
					'.MuiDrawer-paper': {
						borderRight: 'none !important'
					},
					'.MuiAccordionSummary-root .MuiAccordionSummary-content': {
						margin: '12px 8px !important'
					},
					'.MuiAccordionSummary-root .MuiAccordionSummary-content.Mui-expanded': {
						margin: '12px 8px !important'
					},
					'.MuiAccordionSummary-root.Mui-expanded': {
						minHeight: '0 !important'
					},
					'.MuiAccordionSummary-root.Mui-expanded .MuiTypography-root': {
						marginLeft: '0 !important'
					},
					'.tox-tinymce': {
						borderWidth: '1px !important',
						borderRadius: '0px !important'
					},
					'#editor textarea': {
						display: 'none'
					},
					'.sketch-picker ': {
						borderRadius: '0px !important',
						width: 'calc(100% - 20px) !important',
						boxShadow: 'none !important'
					},
					'&::-webkit-scrollbar, & *::-webkit-scrollbar': {
						backgroundColor: '#eee',
						maxWidth: 3,
						maxHeight: 3
					},
					'&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
						backgroundColor: '#6366F1',
						minHeight: 10,
						borderRadius: '10px'
					},
					'&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
						backgroundColor: '#717171'
					},
					'&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
						backgroundColor: '#717171'
					},
					'&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
						backgroundColor: '#717171'
					},
					'&::-webkit-scrollbar-track': {
						boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
						webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
					},
					'.recharts-pie-labels': {
						display: 'none'
					}
				}}
			/>
			<Router>
				<App />
			</Router>
		</ThemeProvider>
		{/* </CacheProvider> */}
	</React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
