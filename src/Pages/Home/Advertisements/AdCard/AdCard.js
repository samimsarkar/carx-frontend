import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import BookModal from '../../../Products/BookModal/BookModal';

const AdCard = ({ ad }) => {
    const [success, setSuccess] = useState(false);
    const [verified, setVerified] = useState(false);
    const [wished, setWished] = useState(false);
    const { user } = useContext(AuthContext);

    const handleWish = product => {
        const newProduct = {
            productId: product._id,
            advertise: product.advertise,
            category: product.category,
            condition: product.condition,
            date: product.date,
            description: product.description,
            image: product.image,
            location: product.location,
            mobileNumber: product.mobileNumber,
            originalPrice: product.originalPrice,
            productName: product.productName,
            sellerEmail: product.sellerEmail,
            sellerName: product.sellerName,
            sellerPhoto: product.sellerPhoto,
            sellerStatus: product.sellerStatus,
            sellingPrice: product.sellingPrice,
            timestamp: product.timestamp,
            uid: product.uid,
            yearOfPurchase: product.yearOfPurchase,
            wishedById: user.uid,
            wishedByName: user.displayName,
            wishedByEmail: user.email,
            wishedByPhoto: user.photoURL
        }
        fetch('https://carx-delta.vercel.app/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setWished(true)
                    toast.success('Product Added to Wishlist!')
                }
            })
    }

    useEffect(() => {
        fetch(`https://carx-delta.vercel.app/user/${ad.sellerEmail}`)
            .then(res => res.json())
            .then(data => setVerified(data.verified))
    }, [ad?.sellerEmail])

    useEffect(() => {
        fetch(`https://carx-delta.vercel.app/wishlist?productId=${ad?._id}&&userId=${user?.uid}`)
            .then(res => res.json())
            .then(data => setWished(data))
    }, [ad?._id, user?.uid])

    return (
        <div className="card card-compact bg-base-100 shadow-lg">
            {success === false && <BookModal product={ad} setSuccess={setSuccess}></BookModal>}
            <figure><img src={ad.image} alt="Shoes" /></figure>
            <div className="card-body">
                <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white card-title">{ad.productName}</h5>
                    <div className='flex items-center justify-between gap-2 mb-2'>
                        <span className='text-xs'>{ad.location}</span>
                        <span className='text-xs'>Used {new Date().getFullYear() - ad.yearOfPurchase} years</span>
                    </div>
                    <div className='flex items-center justify-between gap-2 mb-2'>
                        <span className='text-xs'>Posted at <b>{new Date(ad?.timestamp).toDateString()}, {new Date(ad?.timestamp).toLocaleTimeString()}</b></span>
                        <span className='text-xs'>Seller <b>{ad.sellerName}</b> {
                            verified && <span className="inline-flex items-center p-1 mr-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-200 dark:text-blue-800">
                                <svg aria-hidden="true" className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Icon description</span>
                            </span>
                        }</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">Original Price: <del>${ad.originalPrice}</del></span>
                        <span className="text-md font-bold text-gray-900 dark:text-white">Resale Price: ${ad.sellingPrice}</span>
                    </div>

                    <div className="card-actions justify-between">
                        <label htmlFor={ad._id} className="btn btn-secondary">
                            Book Now
                        </label>
                        {
                            wished ?
                                <button className='btn btn-disabled'>Added to Wishlist</button>
                                :
                                <button onClick={() => handleWish(ad)} className='btn btn-warning'>Add to Wishlist</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdCard;