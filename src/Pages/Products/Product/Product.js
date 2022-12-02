import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import BookModal from '../BookModal/BookModal';

const Product = ({ product }) => {
    const [success, setSuccess] = useState(false);
    const { image, productName } = product;
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
        fetch(`https://carx-delta.vercel.app/user/${product.sellerEmail}`)
            .then(res => res.json())
            .then(data => setVerified(data.verified))
    }, [product.sellerEmail])

    useEffect(() => {
        fetch(`https://carx-delta.vercel.app/wishlist?productId=${product._id}&&userId=${user.uid}`)
            .then(res => res.json())
            .then(data => setWished(data))
    }, [product._id, user.uid])

    return (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            {success === false && <BookModal product={product} setSuccess={setSuccess}></BookModal>}
            <img className="p-8 rounded-t-lg" src={image} alt={productName} />
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{productName}</h5>
                <div className='flex items-center justify-between gap-2 mb-2'>
                    <p className='text-xs'>{product.location}</p>
                    <p className='text-xs'>Used {new Date().getFullYear() - product.yearOfPurchase} years</p>
                </div>
                <div className='flex items-center justify-between gap-2 mb-2'>
                    <p className='text-xs'>Posted at <b>{new Date(product?.timestamp).toDateString()}, {new Date(product?.timestamp).toLocaleTimeString()}</b></p>
                    <p className='text-xs inline-flex'>Seller <b>{product.sellerName}</b> {
                        verified && <span className="inline-flex items-center p-1 mr-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-200 dark:text-blue-800">
                            <svg aria-hidden="true" className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Icon description</span>
                        </span>
                    }</p>
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">Original Price: <del>${product.originalPrice}</del></span>
                    <span className="text-md font-bold text-gray-900 dark:text-white">Resale Price: ${product.sellingPrice}</span>
                </div>
                <div className='w-full flex justify-between'>
                    <label htmlFor={product._id} className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Book Now
                    </label>
                    {
                        wished ?
                            <button className='btn btn-disabled'>Added to Wishlist</button>
                            :
                            <button onClick={() => handleWish(product)} className='btn btn-warning'>Add to Wishlist</button>
                    }
                </div>
            </div>
        </div>

    );
};

export default Product;