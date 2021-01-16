import React, {  Fragment } from 'react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import Banner from '../Banner/Banner';
import ShopNow from '../ShopNow/ShopNow';
import HorizontalScroll from '../CategoriesBar/CategoriesBar'
const Accueil = () => {
        return (
        <Fragment>
            <Navbar />
            <Banner />
            <HorizontalScroll />
            <Footer />
        </Fragment>

        )
    
};

export default Accueil;
