import React from 'react';
import useTitle from '../../Hooks/useTitle';
import Advertisements from './Advertisements/Advertisements';
import CategoriesSlider from './CategoriesSlider/CategoriesSlider';
import Contact from './Contact/Contact';
import HeroSection from './HeroSection/HeroSection';

const Home = () => {
    useTitle('Home')
    return (
        <section>
            <HeroSection></HeroSection>
            <Advertisements></Advertisements>
            <CategoriesSlider></CategoriesSlider>
            <Contact></Contact>
        </section>
    );
};

export default Home;