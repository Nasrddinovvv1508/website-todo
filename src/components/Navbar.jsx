import { Link } from 'react-router-dom'

import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

let logOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

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
            <button onClick={logOut} className='btn btn-error text-white'>Log Out</button>
          </div>
        </nav>
      </div>

    </header>
  )
}

export default Navbar