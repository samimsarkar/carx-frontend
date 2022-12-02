import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useSeller from '../Hooks/useSeller';

const DashboardMain = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isBuyer] = useBuyer(user?.email)
    const [isSeller] = useSeller(user?.email)
    return (
        <div className='my-24 px-5'>
            <div className="drawer drawer-mobile h-auto">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Menubar</label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 flex flex-col gap-2 text-red-600">
                        {
                            isBuyer &&
                            <>
                                <li className='shadow-md'><NavLink to='/dashboard/my-orders'>My Orders</NavLink></li>
                                <li className='shadow-md'><NavLink to='/dashboard/my-wishlist'>My WishList</NavLink></li>
                            </>
                        }
                        {
                            isSeller &&
                            <>
                                <li className='shadow-md'><NavLink to='/dashboard/my-products'>My Products</NavLink></li>
                                <li className='shadow-md'><NavLink to='/dashboard/add-a-product'>Add A Product</NavLink></li>
                            </>
                        }
                        {isAdmin &&
                            <>
                                <li className='shadow-md'><NavLink to='/dashboard/all-sellers'>All Sellers</NavLink></li>
                                <li className='shadow-md'><NavLink to='/dashboard/all-buyers'>All Buyers</NavLink></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardMain;