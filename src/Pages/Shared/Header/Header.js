import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '../Navbar/Navbar';

const Header = () => {
    return (
        <header className='fixed top-0 left-0 z-50 w-full'>
            <Toaster></Toaster>
            <Navbar></Navbar>
        </header>
    );
};

export default Header;