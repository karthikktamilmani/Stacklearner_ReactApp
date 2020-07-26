// Author: Ravi Patel


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../authentication/axios-user-management";

const TutorialPlayer = (props) => {
    const { tutorialID } = props;
    const [ data, setData ] = useState(null);
    
    useEffect(() => {
        const fetchData = async ( ) => {
            const response = await axios.get(`learningpath/tutorials/${tutorialID}`);
            setData(response.data);
        }
        fetchData();
    }, [tutorialID]);

    if (data != null) {
        return (
            <>
                <h2 className="tutorial-title-link"><Link to="/student/dashboard" aria-label="Go back to the dashboard"><i className="fas fa-angle-left"></i>{data.tutorialTitle}</Link></h2>
                <video src={"/videos/tutorial_1.mp4"} controls></video>
            </>
        );
    } else {
        return <img src="/images/loading.gif" alt="Some" />
    }
}

export default TutorialPlayer;