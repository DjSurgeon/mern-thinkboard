/**
 * components/Navbar.tsx
 */

import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="container mx-auto">
        {/* Logo / título */}
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          ThinkBoard
        </Link>

        {/* Links de navegación */}
        <div className="flex-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `btn btn-ghost ${isActive ? 'btn-active' : ''}`
            }
          >
            Main
          </NavLink>
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `btn btn-ghost ${isActive ? 'btn-active' : ''}`
            }
          >
            Create Note
          </NavLink>
        </div>

        {/* Extra: botón tema DaisyUI */}
        <div className="flex-none">
          <label className="swap swap-rotate">
            {/* Icono sol */}
            <input type="checkbox" className="theme-controller" value="dark" />
            <svg
              className="swap-on fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64 17l-1.41 1.41 1.41-1.41zm0-10l-1.41-1.41 1.41 1.41zm12.73 10l1.41 1.41-1.41-1.41zM12 4V1m0 22v-3m8.36-13l1.41-1.41-1.41 1.41zM4 12H1m22 0h-3m-9 9.31A7.31 7.31 0 1 1 12 4.69 7.31 7.31 0 0 1 12 21.31z" />
            </svg>
            {/* Icono luna */}
            <svg
              className="swap-off fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64 13a9 9 0 0 1-11.31 8.63 9 9 0 1 0 0-17.26A9 9 0 0 1 21.64 13z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Navbar
