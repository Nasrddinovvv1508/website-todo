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

function Navbar() {
  let dispatch = useDispatch();

  let { user } = useSelector((state) => state.user)
  console.log(user);

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
    // <header className='bg-base-300'>
    //   <div className='align-elements'>
    //     <nav className='navbar'>
    //       <div className="navbar-start">
    //         <Link to='/'>
    //           <h1 className='text-4xl font-bold'>Logo</h1>
    //         </Link>
    //       </div>
    //       <div className="navbar-end flex gap-2">
    //         <div className='flex items-center gap-5 mr-4'>
    //           <h3 className=''>{user.displayName}</h3>

    //           <div className="avatar">
    //             <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
    //               <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`} alt="user img" />
    //             </div>
    //           </div>
    //         </div>

    //         <button onClick={logOut} className='btn btn-error text-white'>Log Out</button>
    //       </div>
    //     </nav>
    //   </div>

    // </header>
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
            <li className=''>
              <div className="avatar hover:bg-white active:bg-transparent mb-1 ">
                <div className="ring-primary ring-offset-base-100 w-9 rounded-full ring ring-offset-2 ">
                  <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`} alt="user img" />
                </div>
              </div>
              <h1 className='text-[#636262] text-xl hover:bg-white cursor-default font-semibold'>{user && user.displayName}</h1>
            </li>
            <li><Link to="/" className='text-base font-semibold text-white bg-[#4c87ed] hover:bg-[#1961dc]'>Homepage</Link></li>
            <li><button onClick={logOut} className='text-[#343434] bg-[#af2929] hover:bg-[#8b1414] text-base font-semibold'>Log out</button></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a style={{ letterSpacing: `2px` }} className="btn btn-ghost text-3xl font-bold">Website Todo</a>
      </div>
      <div className="navbar-end">

      </div>
    </header>
  )
}

export default Navbar