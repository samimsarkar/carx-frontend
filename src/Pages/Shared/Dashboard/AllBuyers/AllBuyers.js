import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useTitle from '../../../../Hooks/useTitle';

const AllBuyers = () => {
    const { loading } = useContext(AuthContext);
    useTitle('All Buyers')

    const { data: AllBuyers = [], isLoading, refetch } = useQuery({
        queryKey: ['AllBuyers'],
        queryFn: () => fetch(`https://carx-delta.vercel.app/all-buyer`)
            .then(res => res.json())
    })

    const handleDelete = userId => {
        const agree = window.confirm(`Are you sure about deleting the user!`);
        if (agree) {
            fetch(`https://carx-delta.vercel.app/user/${userId}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch()
                        toast.success('Buyer Deleted Successfully!');
                    }
                })
        }
    }

    const handleverified = user => {
        fetch(`https://carx-delta.vercel.app/user/verified/${user._id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success('Buyer Verified Successfully!')
                }
            })
    }

    if (loading && isLoading) {
        return <div className='min-h-screen relative bg-yellow-400'>
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
            </div>
        </div>
    }

    return (
        <div>
            <h1 className='text-4xl font-bold my-4'>My Buyers</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Image & Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            AllBuyers?.map((user, i) =>
                                <tr key={user._id}>
                                    <th>
                                        {i + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-24 h-24">
                                                    <img src={user.photoURL} alt={user.displayName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.displayName}</div>
                                                <div className="text-sm opacity-50"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>{user.role}</td>
                                    <td>
                                        {
                                            user.verified ?
                                                <span className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded-full dark:bg-blue-200 dark:text-blue-800">
                                                    <svg aria-hidden="true" className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                    <span className="sr-only">Icon description</span>
                                                </span>
                                                :
                                                <button onClick={() => handleverified(user)} className="btn btn-secondary bg-orange-500 btn-xs">Verify</button>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(user._id)} className="btn btn-secondary bg-red-600 btn-sm">Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Sl</th>
                            <th>Image & Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;