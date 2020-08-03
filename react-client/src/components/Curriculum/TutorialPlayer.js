// Auhtor: Mansoor Ghazi
// Author: Ravi Patel

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "../../authentication/axios-user-management";

const TutorialPlayer = (props) => {
	const {tutorialID} = props;
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(`learningpath/tutorials/${tutorialID}`);
			setData(response.data);
		}
		fetchData();
	}, [tutorialID]);

	if (data != null) {
		return (

			<>
				<h2 className="tutorial-title-link"><Link to="/student/dashboard" aria-label="Go back to the dashboard"><i
					className="fas fa-angle-left"/>{data.tutorialTitle}</Link></h2>
				<video src={data.tutorialVideoURL} controls/>
			</>
		);
	} else {
		return <div className="img-loader">
			<img src="/images/loading.gif" width="100%" height="auto" alt="Some"/>
		</div>
	}
}

export default TutorialPlayer;
