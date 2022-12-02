import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const AddAProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userStatus, setUserStatus] = useState(false);
    const { user } = useContext(AuthContext);
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch('https://carx-delta.vercel.app/categories')
            .then(res => res.json())
    })

    useEffect(() => {
        fetch(`https://carx-delta.vercel.app/user/${user.email}`)
            .then(res => res.json())
            .then(data => {
                const verified = data.verified || false;
                // const newData = { ...data }
                // newData.verified = verified;
                setUserStatus(verified)
            })
    }, [user?.email])

    const navigate = useNavigate();

    const submitHandler = (product) => {
        const newProduct = { ...product, uid: user.uid, sellerName: user.displayName, sellerEmail: user?.email, sellerPhoto: user.photoURL }

        const productImage = product.ProductImage[0];
        const formData = new FormData();
        formData.append('image', productImage);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_ImageHostKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.error) {
                    toast.error("Sorry, Something went wrong while uploading your file!")
                } else {
                    const newProd = {
                        category: newProduct.Category,
                        condition: newProduct.Condition,
                        mobileNumber: newProduct.MobileNumber,
                        originalPrice: newProduct.OriginalPrice,
                        image: imgData.data.url,
                        productName: newProduct.ProductName,
                        sellingPrice: newProduct.SellingPrice,
                        yearOfPurchase: newProduct.YearOfPurchase,
                        description: newProduct.description,
                        location: newProduct.location,
                        sellerEmail: newProduct.sellerEmail,
                        sellerName: newProduct.sellerName,
                        sellerPhoto: newProduct.sellerPhoto,
                        sellerStatus: userStatus,
                        advertise: false,
                        uid: newProduct.uid,
                        timestamp: new Date().getTime(),
                        date: new Date()
                    }

                    // Save product into database
                    fetch('https://carx-delta.vercel.app/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(newProd)
                    }).then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('Product Added Successfuly!');
                                navigate('/dashboard/my-products')
                            } else {
                                toast.error('Sorry, Something went wrong while adding the product!')
                            }
                        })
                }
            })

    }

    return (
        <div className='my-28 max-w-6xl mx-auto p-5'>
            <h1 className='text-4xl font-bold mb-7 text-center text-indigo-600 underline'>Add a Product</h1>
            <form onSubmit={handleSubmit(submitHandler)} className="w-full">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Product Name
                        </label>
                        <input {...register('ProductName', {
                            required: "Product Name is required!"
                        })} className="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Products Name" />
                        {
                            errors.ProductName ?
                                <p className="text-red-500 text-xs italic">{errors.ProductName.message}</p>
                                : ''
                        }
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            Original Price
                        </label>
                        <input {...register('OriginalPrice', {
                            required: "Original Price is required!"
                        })} className="appearance-none block w-full text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Original Price" />
                        {
                            errors.OriginalPrice ?
                                <p className="text-red-500 text-xs italic">{errors.OriginalPrice.message}</p>
                                : ''
                        }
                    </div>
                </div>
                <div className="flex flex-col flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Location
                        </label>
                        <input {...register('location', {
                            required: "Location is required!"
                        })} className="appearance-none block w-full text-gray-700  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Location..." />
                        {
                            errors.location ?
                                <p className="text-red-500 text-xs italic">{errors.location.message}</p>
                                : ''
                        }
                    </div>
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Description
                        </label>
                        <input {...register('description', {
                            required: "Description is required!"
                        })} className="appearance-none block w-full text-gray-700  rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Description..." />
                        {
                            errors.description ?
                                <p className="text-red-500 text-xs italic">{errors.description.message}</p>
                                : ''
                        }
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-7">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Selling Price
                        </label>
                        <input {...register('SellingPrice', {
                            required: "Selling Price is required!"
                        })} className="appearance-none block w-full text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Selling Price" />
                        {
                            errors.SellingPrice ?
                                <p className="text-red-500 text-xs italic">{errors.SellingPrice.message}</p>
                                : ''
                        }
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            Category
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" {...register('Category', {
                                required: "Please Select Product Category!"
                            })}>
                                <option value=''>Select Category</option>
                                {
                                    isLoading === false ?
                                        categories.map(
                                            category =>
                                                <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                        )

                                        : ''
                                }
                            </select>
                            {
                                errors.Category ?
                                    <p className="text-red-500 text-xs italic">{errors.Category.message}</p>
                                    : ''
                            }
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                            Year of Purchase
                        </label>
                        <input {...register('YearOfPurchase', {
                            required: 'Year of Purchase is required!'
                        })} className="appearance-none block w-full text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="Year of Purchase" />
                        {
                            errors.YearOfPurchase ?
                                <p className="text-red-500 text-xs italic">{errors.YearOfPurchase.message}</p>
                                : ''
                        }
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Mobile Number
                        </label>
                        <input {...register('MobileNumber', {
                            required: "Mobile Number is required!"
                        })} className="appearance-none block w-full text-gray-700  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Mobile Number" />
                        {
                            errors.MobileNumber ?
                                <p className="text-red-500 text-xs italic">{errors.MobileNumber.message}</p>
                                : ''
                        }
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                            Condition
                        </label>
                        <div className="relative">
                            <select name='condition' {...register('Condition', {
                                required: 'Please Select the Condition of your product!'
                            })} className="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value=''>Select Condition</option>
                                <option>Excellent</option>
                                <option>Good</option>
                                <option>Fair</option>
                            </select>
                            {
                                errors.Condition ?
                                    <p className="text-red-500 text-xs italic">{errors.Condition.message}</p>
                                    : ''
                            }
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Product Image
                        </label>
                        <input {...register('ProductImage', {
                            required: "Please choose a photo of your product!"
                        })} className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="file" placeholder="Product Image" />
                        {
                            errors.ProductImage ?
                                <p className="text-red-500 text-xs italic">{errors.ProductImage.message}</p>
                                : ''
                        }
                    </div>
                </div>
                <div>
                    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-lg border-4 text-white py-1 px-2 rounded w-full mt-5" type="submit">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAProduct;