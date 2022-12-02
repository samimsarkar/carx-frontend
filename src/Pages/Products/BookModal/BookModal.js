import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookModal = ({ product, setSuccess }) => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const bookProduct = info => {
        const key = Object.keys(info);
        const data = {
            productId: product._id,
            category: product.category,
            condition: product.condition,
            mobileNumber: product.originalPrice,
            originalPrice: product.originalPrice,
            image: product.image,
            productName: product.productName,
            sellingPrice: product.sellingPrice,
            yearOfPurchase: product.yearOfPurchase,
            description: product.description,
            location: product.location,
            sellerEmail: product.sellerEmail,
            sellerName: product.sellerName,
            sellerPhoto: product.sellerPhoto,
            phoneNumber: info[key[0]],
            meetingLocation: info[key[1]],
            bookingTime: new Date().getTime(),
            bookedById: user.uid,
            bookedByName: user.displayName,
            bookedByEmail: user?.email,
            bookedByPhoto: user?.photoURL
        }

        fetch('https://carx-delta.vercel.app/book-product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(dt => {
                if (!dt?.message) {
                    toast.success('Product Booked Successfully!');
                    setSuccess(true)
                    navigate('/dashboard/my-orders')
                } else {
                    toast.error(dt.message)
                }
            })
    }
    return (
        <>
            <input type="checkbox" id={product._id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor={product._id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-4">{product.productName}</h3>

                    <form onSubmit={handleSubmit(bookProduct)}>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" name={`buyername-${product._id}`} id={`buyername-${product._id}`} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={user?.displayName} readOnly required />
                            <label htmlFor={`buyername-${product._id}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="email" name={`buyer-email-${product._id}`} id={`buyer-email-${product._id}`} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={user?.email} readOnly placeholder=" " required />
                            <label htmlFor={`buyer-email-${product._id}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Email Address</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" name={`product-name-${product?._id}`} id={`product-name-${product?._id}`} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={product.productName} readOnly placeholder=" " required />
                            <label htmlFor={`product-name-${product?._id}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                        </div>
                        <div className="grid md:grid-cols-1 md:gap-6">
                            <div className="relative z-0 mb-6 w-full group">
                                <input type="text" name={`product-price-${product._id}`} id={`product-price-${product._id}`} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" defaultValue={product.sellingPrice} readOnly placeholder=" " required />
                                <label htmlFor={`product-price-${product._id}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Price</label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 mb-6 w-full group">
                                <input {...register(`phoneNumber_${product._id}`, { required: true })} type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{5}" id={`phone-${product._id}`} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor={`phone-${product._id}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (01*********)</label>
                            </div>
                            <div className="relative z-0 mb-6 w-full group">
                                <input {...register(`meetingLocation_${product._id}`, { required: true })} type="text" id={`meeting-location-${product._id}`} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label htmlFor={`meeting-location-${product._id}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Meeting Location</label>
                            </div>
                        </div>
                        <button type="submit" id={product._id} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book Product</button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default BookModal;