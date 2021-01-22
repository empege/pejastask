import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import WeatherPopup from './WeatherPopup'

const Navbar = () => {
  //Gotiva, hook za pathname (iz react-routera)
  const { pathname } = useLocation();

  return (
    <header>
      <div className="center-wrapper">
        <div className="logo"><NavLink to='/users'>Management App</NavLink></div>
        <nav>
          <ul>
            <li>
              <NavLink activeClassName='active' to='/users' isActive={() => ['/', '/users'].includes(pathname)}>Users</NavLink>
            </li>
            <li><NavLink activeClassName='active' to='/companies'>Companies</NavLink></li>
            <li><NavLink activeClassName='active' to='/newsletter'>Newsletter</NavLink></li>
          </ul>
          <div className="divisioner"></div>
          <div className="weather-wrapper">
            Weather
            <WeatherPopup />
          </div>
        </nav>
      </div>

    </header>
  )
}

export default Navbar
