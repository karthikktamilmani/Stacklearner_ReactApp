// Author: Ravi Patel

import React, { Component } from 'react';
import axios from "../../authentication/axios-user-management";
import Auth from '../../authentication/Auth';
import Project from './Project';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusCode: 200,
            projects: [],
            tutorialsFinishedByProject: [],
            totalTutorialsByProject: [],
            studentID: Auth.user._id
        }
    }

    loadProjects = () => {
        axios.get('/learningpath/projects').then((response) => {
            this.setState({
                projects: response.data
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

    getTutorialsFinishedByProject = () => {
        const { studentID } = this.state;
        axios.get(`trackprogress/projects/student/${studentID}/finishedtutorialcount`).then((response) => {
            this.setState({
                tutorialsFinishedByProject: response.data
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

    getTotalTutorialsByProject = () => {
        axios.get('learningpath/tutorialcount').then((response) => {
            this.setState({
                totalTutorialsByProject: response.data
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

    calculateProjectProgress = (projectID, tutorialsFinishedByProject, totalTutorialsByProject) => {
        const projectInTutorialsFinished = tutorialsFinishedByProject.find((element) => projectID === element._id);
        const projectInTutorialsCount = totalTutorialsByProject.find((element) => projectID === element._id);
        let percentageProgress = 0;
        if (projectInTutorialsFinished && projectInTutorialsCount) {
            percentageProgress = projectInTutorialsFinished.count / projectInTutorialsCount.count * 100;
        }
        return percentageProgress;
    }

    setBackgroundColors = (projects) => {
        const backgroundColorsBaseList = ['pink-background', 'blue-background', 'green-background', 'orange-background'];
        const numberOfProjects = projects.length;
        const projectsAfterWhichToLoop = Math.ceil(numberOfProjects / 4);
    
        let counter = 0;
        let backGroundColorsArray = [];
        while (counter < projectsAfterWhichToLoop) {
            backGroundColorsArray = backgroundColorsBaseList.concat(backgroundColorsBaseList);
            counter++;
        }
            
        return backGroundColorsArray;
    }

    componentDidMount() {
        this.loadProjects();
        this.getTutorialsFinishedByProject();
        this.getTotalTutorialsByProject();
    }

    render() {
        const { statusCode, projects, tutorialsFinishedByProject, totalTutorialsByProject } = this.state;
        let displayProjects = [];
        let alertDIV = <div></div>;
    
        if (statusCode === 404) {
            alertDIV = <div className="alert alert-primary" role="alert">We are working on adding projects. Please check back soon.</div>;
        } else if (statusCode !== 404 && statusCode !== 200) {
            alertDIV = <div className="alert alert-danger" role="alert">We encountered an error while loading your learning path.</div>;
        } else if (statusCode === 200) {
            displayProjects = projects.map((project, index) => {
                const backGroundColorsArray = this.setBackgroundColors(projects);

                return <Project key={project._id} progress={this.calculateProjectProgress(project._id, tutorialsFinishedByProject, totalTutorialsByProject)} {...project} imageBackgroundColor={backGroundColorsArray[index]} />
            });
        }
        
        return (
            <div className="grid">
                {statusCode !== 200 ? alertDIV : displayProjects}
            </div>
        );
    }
}

export default Projects;