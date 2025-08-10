/**
 * 
 */
// src/App.tsx
import React from 'react'
import Router from './router'
import { Toaster } from 'react-hot-toast'

const App: React.FC = () => {
	return (
		<div data-theme="dracula">
			<Router />
			<Toaster position="top-right" />
		</div>
	)
}

export default App
