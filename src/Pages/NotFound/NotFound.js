import React from 'react';

const NotFound = () => {
    return (
        <div className="bg-indigo-900 relative overflow-hidden h-screen">
            <div className="inset-0 bg-black opacity-25 absolute">
            </div>
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                <div className="w-full font-mono flex flex-col items-center relative z-10">
                    <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                        You are all alone here
                    </h1>
                    <p className="font-extrabold text-8xl mt-20 text-white animate-bounce">
                        404
                    </p>
                    <p className='font-extrabold text-5xl my-4 text-white animate-bounce'>Not Found</p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;