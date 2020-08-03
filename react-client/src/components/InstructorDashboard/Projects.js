import React, {Component} from 'react';
import axios from '../../authentication/axios-user-management';
import {Link, Redirect} from "react-router-dom";
import Loading from '../Common/Loading';
import ProjectCard from "../InstructorDashboard/ProjectCard";

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
					projects: [],
					loading: true,
					unAuthorized: false
				}
    }

    getAllProjects = async () => {
			let projects;
			try {
				projects = await axios.get('instructionmanagement/projects');
			} catch (e) {
				// console.log(e.response.data.message);
				alert(e.response.data.message);
				if (e.response.status === 401) {
					this.setState({
						unAuthorized: true
					});
				}
				// this.props.history.push('/student/dashboard');
				// console.log('after push');
			}
			return projects;
		}

    componentDidMount() {
        this.getAllProjects().then((result) => {
					if (result.status === 200) {
						this.setState({
							projects: result.data,
							loading: false
						});
					} else {
						this.setState({
							error: true
						});
					}
				}).catch((e) => {
					this.setState({
						error: true
					});
				});
    }

    displayProjects = () => {
        const { projects, loading, error } = this.state;
        if (projects.length > 0) {
            return projects.map((project, index) => {
                const backGroundColorsArray = this.setBackgroundColors(projects);
                return <ProjectCard key={project._id} projectNumber={index+1} deleteHandler={this.removeProject} imageBackgroundColor={backGroundColorsArray[index]} {...project} />
            });
        } else if (loading && projects.length === 0 && !error) {
            return <Loading message={"Loading projects..."} />
        } else if (error) {
            return <p className="alert alert-danger" role="alert">We encountered an error while loading your projects.</p>
        }
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


    deleteProjectFromDB = async (projectID) => {
        return await axios.delete(`instructionmanagement/projects/${projectID}/deleteproject`);
    }

    removeProject = (projectID, projectTitle) => {

        let textEntered = prompt(`Enter the project\'s name: ${projectTitle} to delete the project. Otherwise click Cancel.`);

        if (textEntered === projectTitle) {
            this.deleteProjectFromDB(projectID).then((result) => {

                if (result.status === 200) {
                    const filteredProjects = this.state.projects.filter(project => project._id !== projectID);
                    this.setState({
                        projects: filteredProjects
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
			const {unAuthorized} = this.state;
			console.log(this.state);
			if (unAuthorized) {
				return <Redirect to={{pathname: "/student/dashboard"}}/>
			}
			return (
				<div className="instructor-dashboard-container">
					<div className="grid">
						{this.displayProjects()}
					</div>
					<div className="grid">
						<div className="col-12 text-center create-project-button-container">
							<Link to="/instructor/createproject" className="button button-accent-outline create-project-button"><i
								className="fas fa-plus"/>Create Project</Link>
						</div>
                </div>
            </div>
        );
    }
}

export default Projects;
