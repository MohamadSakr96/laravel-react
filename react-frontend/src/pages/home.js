import React from 'react';
import AboutUs from '../components/AboutUs/aboutus';
import Carousel from '../components/carousel/carousel';
import Services from '../components/Services/services';

export default function Home() {
  return (
    <div className='home-container'>
      <AboutUs/>
      <Carousel/>
      <Services/>
    </div>
  );
}