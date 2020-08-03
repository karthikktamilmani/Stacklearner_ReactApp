import React from 'react';
import { Link } from 'react-router-dom';

const TutorialCard = (props) => {
    const { _id, tutorialNumber, tutorialTitle, tutorialVideoURL, deleteTutorialHandler } = props;
    return (
        <div className="col-12 tutorial-card-container">
            <Link to={`/${tutorialVideoURL}`}>Tutorial {tutorialNumber}: {tutorialTitle}<i className="far fa-play-circle"/></Link>
            <button className="text-button text-button-small text-button-pink" onClick={() => deleteTutorialHandler(_id, tutorialTitle)}>Delete</button>
        </div>
    )
}

export default TutorialCard;
