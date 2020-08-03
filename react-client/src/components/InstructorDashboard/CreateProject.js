import React, {Component} from 'react';
import Header from './Header';
import axios from '../../authentication/axios-user-management';

class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectNumber: '0',
            projectTitle: '',
            projectDescription: '',
            projectDemoLink: '',
            projectImageURL: '',
            projectLengthHours: "0",
            projectLengthMinutes: "0",
            projectAccessLevel: 'free'
        }
    }

    getProjectsCount = async () => {
        return await axios.get('/instructionmanagement/projects/count');
    }

    componentDidMount() {
        this.getProjectsCount().then((result) => {
            if (result.status === 200) {
                let currentProjectNumber;
                if (result.data.length === 0) currentProjectNumber = 1;
                else currentProjectNumber = result.data[0]["projectsCount"] + 1;

                this.setState({
                    projectNumber: currentProjectNumber
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

    saveProject = async (project) => {
        return await axios.post('/instructionmanagement/projects/createproject', project);
    }

    resetForm = () => {
        const updatedProjectNumber = this.state.projectNumber + 1;
        this.setState({
            projectNumber: updatedProjectNumber,
            projectTitle: '',
            projectDescription: '',
            projectDemoLink: '',
            projectImageURL: '',
            projectLengthHours: "0",
            projectLengthMinutes: "0",
            projectAccessLevel: 'free'
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

			const project = this.state;

			this.saveProject(project).then((result) => {
				if (result.status === 201) {
					console.log('Project created.');
					this.setState({
						saved: true
					});
					this.resetForm();
				} else this.setState({error: true});
			}).catch(() => {
            this.setState({
                error: true
            });
        });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })
    }

    handleFileChange = (event) => {
        const imageFile = event.target.files[0];
        this.setState({projectImageURL: imageFile});
    }

    statusAlert = () => {
        if (this.state.saved) {
            return (
                <div className="col-12 max-auto alert alert-success" role="alert">
                    Project created successfully.
                </div>
            )
        } else if (this.state.error) {
            return (
                <div className="col-12 max-auto alert alert-danger" role="alert">
                    We encountered an error. Try refreshing the webpage or check your internet connection.
                </div>
            )
        }
    }


    render() {
			const {projectNumber, projectImageURL, projectTitle, projectDescription, projectDemoLink, projectLengthHours, projectLengthMinutes, projectAccessLevel} = this.state;

        return (
            <>
               <Header />
                <main className="gray-background">
                    <section className="container">
                        <div className="grid">
                            <div className="col-md-8 col-sm-12 offset-md-2 create-update-project-form-container">
                                <h1>Create Project</h1>
                                {this.statusAlert()}
                                <form onSubmit={this.handleSubmit} id="create-project-form">
                                    <fieldset>
                                        <div className="form-controls-group-outer">
                                            <div className="form-controls-group-inner">
                                                <input type="number" name="projectNumber" id="project-number" min="1"
                                                       onChange={this.handleChange} value={projectNumber} required hidden />
                                            </div>
                                            <div className="form-controls-group-inner">
                                                <label htmlFor="project-title">Project Title</label>
                                                <input type="text" name="projectTitle" id="project-title"
                                                       onChange={this.handleChange} value={projectTitle} required />
                                            </div>
                                            <div className="form-controls-group-inner">
                                                <label htmlFor="project-description">Description</label>
                                                <textarea name="projectDescription" id="project-description" onChange={this.handleChange} value={projectDescription} required />
                                            </div>
                                            <div className="form-controls-group-inner">
                                                <label htmlFor="project-demo-link">Live Demo URL</label>
                                                <input type="text" name="projectDemoLink" id="project-demo-link" onChange={this.handleChange} value={projectDemoLink} required />
                                            </div>
                                            <div className="form-controls-group-inner">
                                                <label htmlFor="project-length-hours">Length (Hours)</label>
                                                <input type="number" name="projectLengthHours" id="project-length-hours" onChange={this.handleChange} value={projectLengthHours} min="0" required />
                                            </div>
                                            <div className="form-controls-group-inner">
                                                <label htmlFor="project-length-minutes">Length (Minutes)</label>
                                                <input type="number" name="projectLengthMinutes" id="project-length-minutes" onChange={this.handleChange} value={projectLengthMinutes} min="0" required />
                                            </div>
																					<div className="form-controls-group-inner">
																						<label htmlFor="project-access-level">Access Level</label>
																						<select id="project-access-level" name="projectAccessLevel"
																										onChange={this.handleChange} value={projectAccessLevel} required>
																							<option value="free">Free</option>
																							<option value="pro">Pro</option>
																						</select>
																					</div>
																					<div className="form-controls-group-inner">
																						<label htmlFor="project-image">Demo Image URL</label>
																						<input type="text" onChange={this.handleChange} value={projectImageURL}
																									 name="projectImageURL" required/>
																					</div>
                                        </div>
                                    </fieldset>
                                    <div className="form-button-container">
                                        <button type="submit"
                                                className="button button-small button-accent-outline">Save Project
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
            </>
        );
    }
}

export default CreateProject;
