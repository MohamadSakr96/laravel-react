import React from 'react';
import AboutUs from '../components/AboutUs/aboutus';
import Carousel from '../components/carousel/carousel';

export default function Home() {
  return (
    <div className='home-container'>
      <AboutUs/>
      <Carousel/>
    </div>
  );
}