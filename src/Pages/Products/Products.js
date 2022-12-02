import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Product from './Product/Product';
import axios from 'axios';
import useTitle from '../../Hooks/useTitle';

const Products = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useTitle('Products')

    useEffect(() => {
        axios.get(`https://carx-delta.vercel.app/products/${id}`)
            .then(res => {
                setProducts(res.data);
                setIsLoading(false);
            })
    }, [id])

    const { data: category = {} } = useQuery({
        queryKey: ['category'],
        queryFn: () => fetch(`https://carx-delta.vercel.app/category/${id}`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <div className='min-h-screen relative bg-yellow-400'>
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
            </div>
        </div>
    }

    return (
        <div className='max-w-7xl p-10 my-28 mx-auto'>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Products Under</span> {category?.name}.</h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">{category?.description}.</p>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8'>
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Products;