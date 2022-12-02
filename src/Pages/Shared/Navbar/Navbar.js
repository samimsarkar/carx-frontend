import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import useAdmin from '../../../Hooks/useAdmin';
import useBuyer from '../../../Hooks/useBuyer';
import useSeller from '../../../Hooks/useSeller';
import logo from './../../../assets/logo-icon.png';

const Navbar = () => {

    const { user, logOut, loading } = useContext(AuthContext);
    const [menu, setMenu] = useState(false);
    const [profileMenu, setProfileMenu] = useState(false);
    const [isSeller, isLoading] = useSeller(user?.email);
    const [isAdmin, adminLoadin] = useAdmin(user?.email);
    const [, buyerLoading] = useBuyer(user?.email)

    const NavItems = <>
        <li>
            <NavLink to="/" className={`${({ isActive }) => isActive ? "active" : 'text-gray-500'} block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`} aria-current="page">Home</NavLink>
        </li>
        <li>
            <NavLink to="/blog" className={`${({ isActive }) => isActive ? "active" : ''} block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}>Blog</NavLink>
        </li>
    </>


    return (
        <nav className="bg-transparent border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full" id='navbar'>
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/" className="flex items-center">
                    <img src={logo} className="mr-3 w-40 sm:w-52" alt="Feel the car, drive it, and show it" />
                </Link>
                <div className="flex items-center md:order-2 relative top-0 left-0">
                    {/* Prfile Dropdown Menu */}
                    {
                        user?.uid ?
                            <>
                                {
                                    (isLoading || adminLoadin || buyerLoading) ?
                                        <Link to={
                                            isAdmin ? '/dashboard/all-sellers' :
                                                isSeller ? '/dashboard/my-products' :
                                                    '/dashboard/my-orders'
                                        }><button className="px-3 py-2 border-2 shadow-lg hover:bg-red-500 rounded bg-lime-600 text-white">Dashboard</button></Link>
                                        :
                                        ''
                                }
                                <button onClick={() => logOut()} className="px-3 py-2 border-2 shadow-lg hover:bg-red-500 rounded bg-red-600 text-white mx-2">LogOut</button>
                                <button onClick={() => setProfileMenu(!profileMenu)} type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src={user?.photoURL} alt="" />
                                </button>
                                <div className={`${profileMenu ? '' : 'hidden'} z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 dropdown-menu-style absolute top-0 left-0`} style={{
                                    transform: 'translate(-80px, 46px)'
                                }} id="user-dropdown" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                                    <div className="py-3 px-4">
                                        <span className="block text-sm text-gray-900 dark:text-white">{user?.displayName}</span>
                                        <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{user?.email}</span>
                                    </div>
                                    <ul className="py-1" aria-labelledby="user-menu-button">
                                        <li className='bg-red-300 font-bold'>
                                            <button onClick={() => logOut().then().catch()} className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">Sign out</button>
                                        </li>
                                    </ul>
                                </div>
                            </>
                            :
                            loading ?
                                ''
                                :
                                <>
                                    <Link to="/login" className="px-3 py-2 border-2 shadow-lg hover:bg-red-500 rounded-xl bg-blue-600 text-white">Login</Link>

                                    <Link to="/register" className="px-3 py-2 ml-2 border-2 shadow-lg hover:bg-blue-500 rounded-xl bg-red-600 text-white">Register</Link>
                                </>
                    }
                    <button onClick={() => setMenu(!menu)} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`${menu ? '' : 'hidden'} justify-between items-center w-full md:flex md:w-auto md:order-1`} id="mobile-menu-2">
                    <ul className="flex flex-col p-4 mt-4 rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-50 md:bg-transparent">
                        {NavItems}
                    </ul>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;