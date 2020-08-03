// Auhtor: Mansoor Ghazi
// Author: Ravi Patel

import React, {Component} from 'react';
import axios from "../../authentication/axios-user-management";
import auth from '../../authentication/Auth';
import TutorialPlayer from './TutorialPlayer';
import Loading from '../Common/Loading';
import Discussions from './Discussions';
import FeedbackModal from "./FeedbackModal";

const Tutorial = (props) => {
	const {tutorial, handleClick, currentTutorialID, finishedTutorials} = props;
	const finished = finishedTutorials.some((element) => element.tutorialID === tutorial._id);
	const activeTutorial = currentTutorialID === tutorial._id;

	let tutorialPlayerIcon = "far fa-play-circle";
	if (activeTutorial) {
		tutorialPlayerIcon = "far fa-play-circle currently-playing-icon";
	} else if (finished) {
		tutorialPlayerIcon = "far fa-check-circle";
	}

	return <li data-tutorialid={tutorial._id} onClick={(event) => handleClick(event)}><i
		className={tutorialPlayerIcon}/> {tutorial.tutorialTitle}</li>
}

const Module = (props) => {
	const {title, moduleTutorials, handleClick, currentTutorialID, finishedTutorials} = props;

	return (
		<>
			<p className="header-paragraph">{title}</p>
			<ul>
				{
					moduleTutorials.map((tutorial, index) => {
						return <Tutorial key={index} tutorial={tutorial} handleClick={handleClick}
														 currentTutorialID={currentTutorialID} finishedTutorials={finishedTutorials}/>
					})
				}
			</ul>
		</>
	)
}

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			statusCode: '',
			tutorials: [],
			finishedTutorials: [],
			showFeedbackModal: false
		}
	}

	componentDidMount() {
		/* Since the progress tracking feature isnit up yet, we can simple get the first tutorial of the
		project: it's number, ID, and the total number of tutorials of this project.
		*/
		const {projectID} = this.props;
		const studentID = auth.user._id;
		this.getAllTutorials(projectID);
		this.getFinishedTutorials(projectID, studentID);
	}

	componentDidUpdate(previousProps, previousState) {
		if (previousState.tutorials !== this.state.tutorials || previousState.finishedTutorials !== this.state.finishedTutorials) {
			this.tutorialToStartAt();
		}
	}

	getAllTutorials = (projectID) => {
		axios.get(`learningpath/projects/${projectID}/tutorials`).then((response) => {
			this.setState({
				tutorials: response.data,
			});
		}).catch((error) => {
			console.log(`Following error was encountered: ${error}`);
			if (error.response) {
				this.setState({
					statusCode: error.response.status
				});
			} else {
				this.setState({
					statusCode: 300
				});
			}
		});
	}

	getFinishedTutorials = (projectID, studentID) => {
		axios.get(`trackprogress/projects/${projectID}/student/${studentID}/finishedtutorials`).then((response) => {
			this.setState({
				finishedTutorials: response.data
			});
		}).catch((error) => {
			console.log(`Following error was encountered: ${error}`);
			if (error.response) {
				this.setState({
					statusCode: error.response.status
				});
			} else {
				this.setState({
					statusCode: 300
				});
			}
		});
	}

	tutorialToStartAt = () => {
		const {tutorials, finishedTutorials} = this.state;
		if (tutorials.length > 0 && finishedTutorials.length > 0) {
			const tutorialToStartAtIndex = finishedTutorials.length;
			if (tutorialToStartAtIndex >= tutorials.length) {
				this.setState({
					currentTutorialID: tutorials[tutorials.length - 1]._id
				});
			} else {
				this.setState({
					currentTutorialID: tutorials[tutorialToStartAtIndex]._id
				})
			}
		} else if (tutorials.length > 0 && finishedTutorials.length === 0) {
			this.setState({
				currentTutorialID: tutorials[0]._id
			});
		}
	}

	handleClick = (event) => {
		const {projectID} = this.props;
		const tutorialIDOfClickedListItem = event.target.dataset.tutorialid;

		this.setState({
			currentTutorialID: tutorialIDOfClickedListItem
		});

		const tutorialToMarkFinish = {
			projectID: projectID,
			tutorialID: tutorialIDOfClickedListItem
		}

		this.markTutorialFinished(tutorialToMarkFinish);
	}

	incrementCurrentTutorialID = () => {
		const {tutorials, currentTutorialID} = this.state;
		const currentTutorial = tutorials.find((tutorial) => tutorial._id === currentTutorialID);
		if (tutorials.indexOf(currentTutorial) === tutorials.length - 1) {
			console.log('Last tutorial of the project.');
			this.setState({
				showFeedbackModal: true
			})
		} else {
			this.setState({
				currentTutorialID: tutorials[tutorials.indexOf(currentTutorial) + 1]._id
			});
		}
	}

	decrementCurrentTutorialID = () => {
		const {tutorials, currentTutorialID} = this.state;
		const currentTutorial = tutorials.find((tutorial) => tutorial._id === currentTutorialID);
		if (tutorials.indexOf(currentTutorial) === 0) {
			console.log('First tutorial of the project.');
		} else {
			this.setState({
				currentTutorialID: tutorials[tutorials.indexOf(currentTutorial) - 1]._id
			});
		}
	}

	markTutorialFinished = (tutorial) => {

		let {finishedTutorials} = this.state;
		const alreadyFinished = finishedTutorials.some((element) => element.tutorialID === tutorial.tutorialID);

		if (alreadyFinished) {
			return;
		} else {
			finishedTutorials.push(tutorial);
			axios.put(`trackprogress/projects/updateprogress`, tutorial).then((response) => {
				if (response.status === 200) {
					this.setState({
						finishedTutorials: finishedTutorials
					});
				} else {
					console.log('We had error saving your progress.')
				}
			}).catch((error) => {
				console.log(`Following error was encountered: ${error}`);
				if (error.response) {
					this.setState({
						statusCode: error.response.status
					});
				} else {
					this.setState({
						statusCode: 300
					});
				}
			});
		}
	}

	navigateToNextTutorial = () => {
		const {currentTutorialID} = this.state;
		const {projectID} = this.props;
		const tutorialToMarkFinish = {
			studentID: auth.user._id,
			projectID: projectID,
			tutorialID: currentTutorialID
		}

		this.markTutorialFinished(tutorialToMarkFinish);
		this.incrementCurrentTutorialID();

	}

	navigateToLastTutorial = () => {
		this.decrementCurrentTutorialID();
	}

	groupTutorialsByModules = (tutorials) => {
		return tutorials.reduce((acc, tutorial) => {
			const moduleTitleKey = tutorial.tutorialModuleID.moduleTitle;
			if (!acc[moduleTitleKey]) {
				acc[moduleTitleKey] = []
			}
			acc[moduleTitleKey].push(tutorial);
			return acc;
		}, {});
	}

	closeModal = () => {
		this.setState({
			showFeedbackModal: false
		})
	}
	onSubmitHandler = (ratings, comments) => {
		const {projectID} = this.props;
		console.log(projectID);
		const body = {
			comment: comments,
			rating: ratings
		};
		console.log(body);
		axios.put(`/feedback/project/${projectID}/save`, body)
			.then((response) => {
				this.setState({
					showFeedbackModal: false
				});
				console.log(this.props);
				this.props.history.push('/student/dashboard');
			})
			.catch((err) => {
				console.log(err);
				console.log(err.response);
			});
	}

	render() {
		const {tutorials, finishedTutorials, currentTutorialID} = this.state;
		if (tutorials && tutorials.length > 0) {
			const modulesObject = this.groupTutorialsByModules(tutorials);
			const moduleTitleKeys = Object.keys(modulesObject);

			return (
				<section className="dark-background tutorial-section-container">
					<div className="container-fluid">
						<FeedbackModal show={this.state.showFeedbackModal} closeModal={this.closeModal}
													 onSubmitHandler={this.onSubmitHandler}/>
						<div className="grid">
							<div className="col-md-9 col-sm-12 video-embed-container">
								{tutorials.length > 0 && currentTutorialID ? <TutorialPlayer tutorialID={currentTutorialID}/> :
									<img src="/images/loading.gif" width="100%" height="auto" alt="Some"/>}
								<div className="tutorial-controls">
									<button type="button" className="button button-medium button-accent-outline back-button"
													aria-label="Previous tutorial" onClick={this.navigateToLastTutorial}><i
										className="fas fa-angle-left"/>Back
									</button>
									<button type="button" className="button button-medium button-green-outline"
													aria-label="Previous tutorial" onClick={this.navigateToNextTutorial}>Next<i
										className="fas fa-angle-right"></i></button>
								</div>
							</div>
							<div className="col-md-3 col-sm-12 tutorials-list-container dark-accent-background">
								<nav aria-label="List of tutorials">
									{
										moduleTitleKeys.map((moduleTitleKey, index) => {
											return <Module key={index} title={moduleTitleKey} moduleTutorials={modulesObject[moduleTitleKey]}
																		 handleClick={this.handleClick} currentTutorialID={currentTutorialID}
																		 finishedTutorials={finishedTutorials}/>
										})
									}
								</nav>
							</div>
						</div>
						<div className="grid">
							<div className="col-md-9 col-sm-12 discussions-wrapper">
								<Discussions projectID={this.props.projectID}/>
							</div>
						</div>
					</div>
				</section>
			);
		} else {
			return (
				<div className="container">
					<div className="grid">
						<div className="col-md-12 text-center">
							<Loading message={"Loading your learning path..."}/>
						</div>
					</div>
				</div>
			)

		}
	}

}

export default Main;
