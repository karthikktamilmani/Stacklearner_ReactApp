// Author: Ravi Patel

import React from 'react';
import { Link } from 'react-router-dom';

const Project = ({ _id, projectTitle, projectNumber, projectDemoLink, projectLengthHours, projectLengthMinutes, projectAccessLevel, progress, projectImageURL, imageBackgroundColor }) => {
    return (
        <div className="col-md-4 col-sm-12">
            <div className="project-card-container">
                <div className={`project-card-image ${imageBackgroundColor}`}>
                    <img src={projectImageURL} alt="Todo list app project"/>
                </div>
                <div className="project-card-outer-body">
                    {console.log(progress)}
                    <div className="progress-bar" style={{width: `${progress}%`}} role="progressbar" aria-valuenow={{progress}} aria-valuemin="0" aria-valuemax="100"></div>
                    <div className="project-card-inner-body">
                        <h4>{projectTitle}</h4>
                        <div className="project-card-controls-container">
                            <Link to={`/student/projects/${_id}`} className="button button-small button-green-outline"><span>{progress === 0 ? "Start" : "Resume"}</span><i className="fas fa-angle-right"></i></Link>
                            <p className="text-muted">Project {projectNumber} &middot; {projectLengthHours}h {projectLengthMinutes}m</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default Project;