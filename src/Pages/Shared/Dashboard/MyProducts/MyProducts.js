import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useTitle from '../../../../Hooks/useTitle';

const MyProducts = () => {
    const { user, loading } = useContext(AuthContext);
    useTitle('My Products')

    const { data: MyProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['myproducts'],
        queryFn: () => fetch(`https://carx-delta.vercel.app/my-products/${user?.email}`)
            .then(res => res.json())
    })

    const handleDelete = productId => {
        const agree = window.confirm(`Are you sure about deleting data!`);
        if (agree) {
            fetch(`https://carx-delta.vercel.app/products/${productId}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch()
                        toast.success('Product Deleted Successfully!');
                    }
                })
        }
    }

    const handleAdvertise = product => {
        fetch(`https://carx-delta.vercel.app/products/advertise/${product._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success('Data Updated Successfully!')
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
            <h1 className='text-4xl font-bold my-4'>My Products</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Product Image & Name</th>
                            <th className='text-center'>Total Sales</th>
                            <th>Price</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            MyProducts?.map((product, i) =>
                                <tr key={product._id}>
                                    <th>
                                        {i + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-24 h-24">
                                                    <img src={product.image} alt={product.productName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.productName}</div>
                                                <div className="text-sm opacity-50">{product.location}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center'>
                                        0
                                    </td>
                                    <td>{product.sellingPrice}</td>
                                    <td>
                                        {
                                            product.advertise ?
                                                <button onClick={() => handleAdvertise(product)} className="btn btn-secondary bg-green-500 btn-xs">Remove Advertisement</button>
                                                :
                                                <button onClick={() => handleAdvertise(product)} className="btn btn-secondary bg-orange-500 btn-xs">Advertise</button>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(product._id)} className="btn btn-secondary bg-red-600 btn-sm">Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Sl</th>
                            <th>Product Image & Name</th>
                            <th className='text-center'>Total Sales</th>
                            <th>Price</th>
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;