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
                return <TutorialCard key={tutorial._id} tutorialNumber={index+1} {...tutorial} />
            });
        } else if (loading && tutorials.length === 0 && !error) {
            return <div>Loading tutorials...</div>
        } else if (!loading && tutorials.length === 0 && !error ) {
            return <p className="text-center">No tutorials created yet.</p>
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
                    tutorials: tutorials
                });
            }
        }).catch(() => {
            this.setState({
                error: true
            });
        });
    }

    render() {
        const { moduleNumber, moduleTitle } = this.props;

        return (
            <div className="col-12 module-card-container">
                <div className="module-card-controls-container blue-background">
                    <h6>Module {moduleNumber}: {moduleTitle}</h6>
                </div>
                {this.displayTutorials()}
                <div className="module-card-controls-container">

                </div>
            </div>
        );
    }
}

export default ModuleCard;