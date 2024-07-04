// rrd
import { Link } from 'react-router-dom'

// firebase
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

// redux
import { useSelector, useDispatch } from 'react-redux';

// toast
import toast from 'react-hot-toast';

import { logout } from '../app/userSlice';

// icons
import { FaHome } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { GiExitDoor } from "react-icons/gi";


function Navbar() {
  let dispatch = useDispatch();

  let { user } = useSelector((state) => state.user);

  let logOut = () => {
    if (confirm(`Are You sure???`)) {
      signOut(auth).then(() => {
        toast.success(`See you Soon ✋`);
        dispatch(logout())
      }).catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
    }
  }

  return (
    <header className="navbar text-white p-5 shadow-lg bg-[#af7eeb] ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 flex gap-2 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl">
            <div className='m-2 mb-0 flex flex-col gap-2'>
              <div className="avatar hover:bg-white active:bg-transparent mb-1 ">
                <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring ring-offset-2 ">
                  <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`} alt="user img" />
                </div>
              </div>
              <h1 className='text-[#636262] text-xl hover:bg-white cursor-default font-semibold'>{user && user.displayName}</h1>
            </div>
            <li>
              <Link to="/" className='text-base font-semibold text-white bg-[#4c87ed] hover:bg-[#1961dc]'> <FaHome /> Homepage</Link>
            </li>
            <li>
              <Link to="/profile" className='text-base font-semibold text-white bg-[#da4ced] hover:bg-[#6b0e7b]'> <GrUpdate size={14} /> Update Profile</Link>
            </li>
            <li>
              <button onClick={logOut} className='text-white bg-[#af2929] hover:bg-[#8b1414] text-base font-semibold'> <GiExitDoor /> Log out</button>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to={`/`} style={{ letterSpacing: `2px` }} className="btn btn-ghost text-3xl font-bold">Website Todo</Link>
      </div>
      <div className="navbar-end">

      </div>
    </header>
  )
}

export default Navbar