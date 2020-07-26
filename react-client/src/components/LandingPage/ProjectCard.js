import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = (props) => {
    const { projectTitle, projectDescription, projectDemoLink, projectImageURL, imageBackgroundColor } = props;

    return (
        <div className="col-md-6 col-sm-12 landing-project-card-container">
            <div className="landing-project-card">
                <div className={`landing-project-card-image ${imageBackgroundColor}`}>
                    <img src={projectImageURL} alt="Todo list app project" />
                </div>
                <div className="landing-project-card-body">
                    <h3>{projectTitle}</h3>
                    <p>{projectDescription}</p>
                    <div className="card-controls">
                        <Link to="/signup" className="button button-small button-accent-outline"><span>Start</span><i className="fas fa-angle-right"></i></Link>
                        {/*Project demo courtesy of @saawsan (https://codepen.io/saawsan)*/}
                        <a href={`${projectDemoLink}`} target="_blank" className="text-link text-link-blue text-link-small" rel="noopener noreferrer">View Demo</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;