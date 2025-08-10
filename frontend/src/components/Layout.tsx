/**
 * 
 */

import React from 'react'
import Navbar from './Navbar'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  )
}

export default Layout
