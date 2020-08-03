// Auhtor: Mansoor Ghazi
// Author: Ravi Patel

import React from 'react';
import Hero from './Hero';
import Projects from './Projects';
import {fadeIn} from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
	fadeIn: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn')
	}
}

const Main = (props) => {
	const {firstName} = props;
	return (
		<StyleRoot>
			<main style={styles.fadeIn}>
				<Hero firstName={firstName}/>
				<section className="learning-path-section gray-background">
					<div className="container">
						<div className="grid">
							<div className="col-md-8 col-sm-12">
								<StyleRoot>
									<div style={styles.fadeIn}>
										<h2>Learning Path</h2>
									</div>
								</StyleRoot>
								<hr className="thick"/>
							</div>
						</div>
						<Projects/>
					</div>
				</section>
			</main>
		</StyleRoot>

	)
}

export default Main;
