import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from '../../authentication/axios-user-management';
import TutorialCard from "./TutorialCard";

class ModuleCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tutorialNumber: 0,
            tutorialTitle: '',
            tutorialVideoURL: '',
            tutorials: []
        };
    }

    loadTutorials = async () => {
        const moduleID = this.props._id;
        return await axios.get(`instructionmanagement/modules/${moduleID}/tutorials`);
    }

    componentDidMount() {
        this.loadTutorials().then((result) => {
            if (result.status === 200) {
                console.log(result);
                this.setState({
                    tutorialNumber: result.data.length + 1,
                    tutorials: result.data,
                    loading: false
                });
            }
        }).catch((err) => {
            this.setState({
                error: true
            });
        });
    }

    displayTutorials = () => {
        const { tutorials, loading, error } = this.state;
        if (tutorials.length > 0) {
            return tutorials.map((tutorial, index) => {
                return <TutorialCard key={tutorial._id} tutorialNumber={index+1} {...tutorial} deleteTutorialHandler={this.removeTutorial}/>
            });
        } else if (loading && tutorials.length === 0 && !error) {
            return <div>Loading tutorials...</div>
        } else if (!loading && tutorials.length === 0 && !error ) {
            return <p className="flash-banner pink-background">No tutorials created yet.</p>
        } else if (error) {
            return <p className="alert alert-danger" role="alert">We encountered an error while loading your modules.</p>
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })
    }

    saveTutorialToDB = async (tutorial) => {
        return await axios.post(`instructionmanagement/tutorials/createtutorial`, tutorial);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { tutorials, tutorialNumber, tutorialTitle, tutorialVideoURL } = this.state;
        const { _id,  moduleProjectID } = this.props;
        const tutorialModuleID = _id;
        const tutorialProjectID = moduleProjectID;

        const tutorialToCreate = { tutorialNumber, tutorialTitle, tutorialVideoURL, tutorialModuleID, tutorialProjectID }

        this.saveTutorialToDB(tutorialToCreate).then((result) => {
            if (result.status === 201) {
                tutorials.push(result.data);
                this.setState({
                    tutorialNumber: tutorials.length + 1,
                    tutorials: tutorials,
                    tutorialTitle: '',
                    tutorialVideoURL: ''
                });
            }
        }).catch(() => {
            this.setState({
                error: true
            });
        });
    }

    deleteTutorialFromDB = async (tutorialID) => {
        return await axios.delete(`http://localhost:4000/instructionmanagement/tutorials/${tutorialID}/deletetutorial`);
    }

    removeTutorial = (tutorialID, tutorialTitle) => {

        let textEntered = prompt(`Enter the tutorial's name: ${tutorialTitle} to delete it. Otherwise click Cancel.`);

        if (textEntered === tutorialTitle) {
            this.deleteTutorialFromDB(tutorialID).then((result) => {

                if (result.status === 200) {
                    const filteredTutorials = this.state.tutorials.filter(tutorial => tutorial._id !== tutorialID);
                    this.setState({
                        tutorials: filteredTutorials,
                        tutorialNumber: filteredTutorials.length + 1
                    });
                } else {
                    this.setState({
                        error: true
                    });
                }

            }).catch(() => {
                this.setState({
                    error: true
                });
            });
        }
    }

    render() {
        const { _id, moduleNumber, moduleTitle, deleteModuleHandler } = this.props;

        return (
            <div className="col-12 module-card-container">
                <div className="module-card-controls-container blue-background">
                    <h6>Module {moduleNumber}: {moduleTitle}</h6>
                    <button className="text-button text-button-small text-button-pink" onClick={() => deleteModuleHandler(_id, moduleTitle)}>Delete</button>
                </div>
                {this.displayTutorials()}
                <div className="create-tutorial-form-container">
                    <form onSubmit={this.handleSubmit} id={`create-tutorial-form-${_id}`}>
                        <div className="form-controls-group-inner">
                            <input type="number" onChange={this.handleChange} value={this.state.tutorialNumber} name="tutorialNumber" hidden/>
                            <input type="text" onChange={this.handleChange} value={this.state.tutorialTitle} name="tutorialTitle" placeholder="Tutorial Title"/>
                            <input type="text" onChange={this.handleChange} value={this.state.tutorialVideoURL} name="tutorialVideoURL" placeholder="Tutorial Video URL" required />
                            <button type="submit"  className="submit-tutorial-form-button"><i className="fas fa-check-circle"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ModuleCard;