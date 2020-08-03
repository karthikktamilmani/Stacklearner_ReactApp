// Auhtor: Mansoor Ghazi
// Author: Ravi Patel

import React from 'react';
import {Link} from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";
import {fadeInUp} from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
	fadeInUp: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
	}
}

const Project = ({_id, projectTitle, projectNumber, projectDemoLink, projectLengthHours, projectLengthMinutes, projectAccessLevel, isPro, progress, projectImageURL, imageBackgroundColor}) => {

	if (isPro !== null) {
		return (
			// <StyleRoot>
			<div className="col-md-4 col-sm-12">
				<StyleRoot>
					<div style={styles.fadeInUp}>
						<div className="project-card-container">
							<div className={`project-card-image ${imageBackgroundColor}`}>
					<span
						className={projectAccessLevel.toLowerCase() === 'free' ? "project-access-level-label free-label-styles" : "project-access-level-label  pro-label-styles"}>{projectAccessLevel}</span>
								<img src={projectImageURL} alt="Todo list app project"/>
							</div>
							<div className="project-card-outer-body">
								{/*{console.log(progress)}*/}
								<div className="progress-bar" style={{width: `${progress}%`}} role="progressbar"
										 aria-valuenow={{progress}}
										 aria-valuemin="0" aria-valuemax="100"/>
								<div className="project-card-inner-body">
									<h4>{projectTitle}</h4>
									<div className="project-card-controls-container">
										<Link
											to={!isPro && projectAccessLevel.toLowerCase() === 'pro' ? "/subscription" : `/student/projects/${_id}`}
											className="button button-small button-green-outline"><span>{progress === 0 ? "Start" : "Resume"}</span><i
											className="fas fa-angle-right"/></Link>
										<p
											className="text-muted">Project {projectNumber} &middot; {projectLengthHours}h {projectLengthMinutes}m</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</StyleRoot>

			</div>
			// </StyleRoot>


		)
	} else return <Spinner/>;

}

export default Project;
