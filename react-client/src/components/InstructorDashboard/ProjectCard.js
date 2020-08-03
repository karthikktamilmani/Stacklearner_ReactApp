import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from "react-bootstrap/Spinner";

const Project = ({_id, projectTitle, projectNumber, projectDescription, projectDemoLink, projectLengthHours, projectLengthMinutes, projectAccessLevel, projectImageURL, imageBackgroundColor, deleteHandler}) => {

        const toParameters = { pathname: `/instructor/curriculum/${_id}/${projectTitle}`}

        return (
            <div className="col-md-4 col-sm-12">
                <div className="project-card-container instructor-project-card-container">
                    <div className={`project-card-image ${imageBackgroundColor}`}>
					<span
                        className={projectAccessLevel.toLowerCase() === 'free' ? "project-access-level-label free-label-styles" : "project-access-level-label  pro-label-styles"}>{projectAccessLevel}</span>
                        <img src={projectImageURL} alt="Todo list app project"/>
                    </div>
                    <div className="project-card-outer-body">
                        <div className="project-card-inner-body">
                            <h4>{projectTitle}</h4>
                            <p>{projectDescription}</p>
                            <div className="project-card-controls-container">
                                <Link
                                    to={toParameters}
                                    className="button button-small button-green-outline"><span>Add / Edit Curriculum</span><i
                                    className="fas fa-angle-right"/></Link>
                                <p className="text-muted">Project {projectNumber} &middot; {projectLengthHours}h {projectLengthMinutes}m</p>
                            </div>
                            <div className="project-card-controls-container">
                                <Link
                                    to={`/instructor/editproject/${_id}`}
                                    className="text-button text-button-small text-button-blue"><span>Edit Project</span></Link>
                                <button className="text-button text-button-small text-button-pink" onClick={() => deleteHandler(_id, projectTitle)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Project;
