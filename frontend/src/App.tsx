/**
 * 
 */
// src/App.tsx
import React from 'react'
import Router from './router'
import { Toaster } from 'react-hot-toast'

const App: React.FC = () => {
	return (
		<>
			{/* Aquí irá la Navbar / Layout cuando la añadamos */}
			<Router />
			<Toaster position="top-right" />
		</>
	)
}

export default App
