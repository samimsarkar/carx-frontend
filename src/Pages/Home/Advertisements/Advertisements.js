import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import AdCard from './AdCard/AdCard';

const Advertisements = () => {

    const { data: ads = [], isLoading } = useQuery({
        queryKey: ['ads'],
        queryFn: () => axios.get('https://carx-delta.vercel.app/ads')
    })

    if (isLoading) {
        return <div className='min-h-screen relative bg-yellow-400'>
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
            </div>
        </div>
    }
    if (ads.data.length > 0) {
        return (
            <div className='my-20 bg-slate-200 py-6'>
                <h2 className="text-4xl font-bold text-center text-red-600 mb-6">Advertisements</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 max-w-7xl mx-auto gap-8'>
                    {
                        ads?.data?.map(ad => <AdCard key={ad._id} ad={ad}></AdCard>)
                    }
                </div>
            </div>
        );
    }
};

export default Advertisements;