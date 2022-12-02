import React from 'react';

const HeroSection = () => {
    return (
        <>
            <section
                className="relative bg-[url(https://c4.wallpaperflare.com/wallpaper/193/556/883/car-neon-chevrolet-corvette-race-cars-hd-wallpaper-preview.jpg)] bg-cover bg-center bg-no-repeat"
            >
                <div
                    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"
                ></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                >
                    <div className="max-w-xl text-center sm:text-left">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            Best Car
                            <strong className="block font-extrabold text-rose-700">
                                Reselling Marketplace.
                            </strong>
                        </h1>

                        <p className="mt-4 max-w-lg sm:text-xl sm:leading-relaxed">
                            Better three hours too soon than a minute too late.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;