import React, {Component} from 'react';
import Projects from "../InstructorDashboard/Projects";
import {bounceInUp, fadeIn, fadeInLeft, fadeInUp} from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
	fadeIn: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn')
	},
	fadeInLeft: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
	},
	bounceInUp: {
		animation: 'x 1s',
		animationName: Radium.keyframes(bounceInUp, 'bounceInUp')
	},
	fadeInUp: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
	}
}

class Main extends Component {
	render() {
		return (
			<section className="learning-path-section gray-background">
				<div className="container">
					<div className="grid">
						<div className="col-md-8 col-sm-12">
							<StyleRoot>
								<div style={styles.fadeInLeft}>
									<h2>Instructor's Dashboard</h2>
									<hr className="thick"/>
								</div>
							</StyleRoot>

						</div>
					</div>
					<StyleRoot>
						<div style={styles.fadeInUp}>
							<Projects/>
						</div>
					</StyleRoot>

				</div>
            </section>
        );
    }
}

export default Main;
