/**
 * @file main.tsx
 * @brief This is the main entry point of the React application.
 * @details It renders the root component (`<App />`) into the DOM, enabling strict mode for better error cheking and future-proofing.
 * @author Sergio Jiménez de la Cruz
 * @date August 13, 2025
 * @version 1.0.1
 * @license MIT
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * @brief Renders the React application into the DOM.
 * @details It targets the HTML element with the ID 'root' and renders the `<App />` component inside `<StrictMode>` for additional development-time checks.
 */

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Failed to find the root element with ID "root" in the document. ❌');
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>
);
