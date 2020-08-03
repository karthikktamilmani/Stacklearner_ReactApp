import React, {Component} from 'react';
import Projects from "../InstructorDashboard/Projects";

class Main extends Component {
    render() {
        return (
            <section className="learning-path-section gray-background">
                <div className="container">
                    <div className="grid">
                        <div className="col-md-8 col-sm-12">
                            <h2>Instructor's Dashboard</h2>
                            <hr className="thick"/>
                        </div>
                    </div>
                    <Projects />
                </div>
            </section>
        );
    }
}

export default Main;