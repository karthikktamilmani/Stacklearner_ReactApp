// Author: Devarshi Pandya
// Email: devarshi.pandya@dal.ca
// Banner ID: B00840003

import React from 'react';

const Testimonials = () => {
    return (
        <section className="testimonials-section dark-background">
            <div className="container">
                <div className="grid">
                    <div className="col-md-8 col-sm-12">
                        <h2>Thank You</h2>
                        <hr className="thick"/>
                    </div>
                </div>
                <div className="grid">

                    <div className="col-md-4 col-sm-12 testimonial-card-container">
                        <div className="testimonial-card-inner-body dark-accent-background">
                            <blockquote>
                                <p>Found the lost ark with my JavaScript GPS app that I learnt to code at stacklearner.</p> 
                                <footer>— Indiana Jones</footer>
                            </blockquote>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 testimonial-card-container">
                        <div className="testimonial-card-inner-body dark-accent-background">
                            <blockquote>
                                <p>Stacklearner's curriculum has the perfect balance of JavaScript theory and practice.</p> 
                                <footer>— Thanos</footer>
                            </blockquote>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 testimonial-card-container">
                        <div className="testimonial-card-inner-body dark-accent-background">
                            <blockquote>
                                <p>Stacklearner made learning JavaScript all too easy.</p> 
                                <footer>— Darth Vader</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;