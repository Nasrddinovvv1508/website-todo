import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className='bg-base-300'>
      <div className='align-elements'>
        <nav className='navbar'>
          <div className="navbar-start">
            <Link to='/'>
              <h1 className='text-4xl font-bold'>Logo</h1>
            </Link>
          </div>
          <div className="navbar-end">
            <button className='btn btn-error text-white'>Log Out</button>
          </div>
        </nav>
      </div>

    </header>
  )
}

export default Navbar