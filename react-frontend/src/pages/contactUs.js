import React from 'react';
import Contactus from '../components/ContactUs/contactus';

export default function ContactUs() {
  return (
      <section className="contact-us">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className='text-success color'>Contact Us!</h1>
                        <h2>Please Fill Out This Form</h2>
                        <hr/>
                        <Contactus/>
                    </div>
                </div>
            </div>
        </section>
  );
}