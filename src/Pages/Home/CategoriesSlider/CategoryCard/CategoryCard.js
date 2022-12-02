import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
    const { _id, name, description } = category;
    return (
        <>
            <div>
                <h3 className="text-3xl font-bold text-indigo-600">{name}</h3>
                <div className="mt-4 border-t-2 border-indigo-100 pt-2">
                    <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
                        {description.slice(0, 100)}...
                    </p>
                </div>
            </div>

            <div className="mt-16 inline-flex items-center text-indigo-600">
                <Link to={`/category/${_id}`}><p className="text-lg font-medium">Show Products</p></Link>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-3 h-6 w-6 transform transition-transform group-hover:translate-x-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
            </div>
        </>
    );
};

export default CategoryCard;