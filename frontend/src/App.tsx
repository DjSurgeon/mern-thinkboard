/**
 * @file App.tsx
 * @brief This is the main application component that serves as the root of the component tree.
 * @details It configuresthe application's global layout, theme, router and toast notifications.
 * @author Sergio Jiménez de la Cruz
 * @date August 9, 2025
 * @version 1.0.0
 * @license MIT
 */

import { Toaster } from 'react-hot-toast'
import Router from './router'

/**
 * @brief The root component of the application.
 * @details It provides the global structure, including the theme, main router, and a toast notification system.
 * The theme is set via a `data-theme` attribute, which can be dynamically changed.
 * @returns {JSX.Element} The main application layout.
 */
const App = () => {
	const theme = "dracula";

	return (
		<div data-theme={theme}>
			<Router />
			<Toaster position="top-right" />
		</div>
	);
};

export default App;
