// Auhtor: Mansoor Ghazi
// Author: Ravi Patel

import React from 'react';
import Hero from './Hero';
import Projects from './Projects';

const Main = (props) => {
    const { firstName } = props;
    return (
        <main>
            <Hero firstName={firstName} />
            <section className="learning-path-section gray-background">
                <div className="container">
                    <div className="grid">
                        <div className="col-md-8 col-sm-12">
                            <h2>Learning Path</h2>
                            <hr className="thick"/>
                        </div>
                    </div>
                    <Projects />
                </div>
            </section> 
        </main>
    )
}

export default Main;