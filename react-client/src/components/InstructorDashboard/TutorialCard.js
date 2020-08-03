import React from 'react';
import { Link } from 'react-router-dom';

const TutorialCard = (props) => {
    const { tutorialNumber, tutorialTitle, tutorialVideoURL } = props;
    return (
        <div className="col-12 tutorial-card-container">
            <Link to={`/images/tutorial_1.mp4`}>Tutorial {tutorialNumber}: {tutorialTitle}<i className="far fa-play-circle"/></Link>
        </div>
    )
}

export default TutorialCard;
