import React, {Component} from 'react';
import Header from './Header';
import axios from '../../authentication/axios-user-management';

class EditProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projectNumber: '',
			projectTitle: '',
			projectDescription: '',
			projectDemoLink: '',
			projectImage: '',
			projectLengthHours: "0",
			projectLengthMinutes: "0",
			projectAccessLevel: 'free'
		}
	}

	getCurrentProject = async () => {
		const {projectID} = this.props.match.params;
		return await axios.get(`http://localhost:4000/instructionmanagement/projects/${projectID}`);
	}

	componentDidMount() {
		this.getCurrentProject().then((result) => {
			if (result.status === 200) {
				console.log(result.data);
				this.setState({
					projectNumber: result.data.projectNumber,
					projectTitle: result.data.projectTitle,
					projectDescription: result.data.projectDescription,
					projectDemoLink: result.data.projectDemoLink,
					projectImageURL: result.data.projectImageURL,
					projectLengthHours: result.data.projectLengthHours,
					projectLengthMinutes: result.data.projectLengthMinutes,
					projectAccessLevel: result.data.projectAccessLevel
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

	updateProject = async (project) => {
		const {projectID} = this.props.match.params;
		return await axios.patch(`http://localhost:4000/instructionmanagement/projects/${projectID}/updateproject`, project);
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const project = this.state;

		this.updateProject(project).then((result) => {
			if (result.status === 200) {
				console.log('Project updated.');
				this.setState({
					updated: true
				});
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
		this.setState({projectImage: imageFile});
	}

	statusAlert = () => {
		if (this.state.updated) {
			return (
				<div className="col-md-8 col-sm-12 max-auto alert alert-success" role="alert">
					Project updated successfully.
				</div>
			)
		} else if (this.state.error) {
			return (
				<div className="col-md-8 col-sm-12 max-auto alert alert-danger" role="alert">
					We encountered an error. Try refreshing the webpage or check your internet connection.
				</div>
			)
		}
	}

	render() {
		const {projectNumber, projectImageURL, projectTitle, projectDescription, projectDemoLink, projectLengthHours, projectLengthMinutes, projectAccessLevel} = this.state;

		return (
			<>
				<Header/>
				<main className="gray-background">
					<section className="container">
						<div className="grid">
							<div className="col-md-8 col-sm-12 offset-md-2 create-update-project-form-container">
								<h1>Update Project</h1>
								{this.statusAlert()}
								<form onSubmit={this.handleSubmit} id="edit-project-form">
									<fieldset>
										<div className="form-controls-group-outer">
											<div className="form-controls-group-inner">
												<input type="number" name="projectNumber" id="project-number" min="1"
															 onChange={this.handleChange} value={projectNumber} required hidden/>
											</div>
											<div className="form-controls-group-inner">
												<label htmlFor="project-title">Project Title</label>
												<input type="text" name="projectTitle" id="project-title"
															 onChange={this.handleChange} value={projectTitle} required/>
											</div>
											<div className="form-controls-group-inner">
												<label htmlFor="project-description">Description</label>
												<textarea name="projectDescription" id="project-description" onChange={this.handleChange}
																	value={projectDescription} required/>
											</div>
											<div className="form-controls-group-inner">
												<label htmlFor="project-demo-link">Live Demo URL</label>
												<input type="text" name="projectDemoLink" id="project-demo-link" onChange={this.handleChange}
															 value={projectDemoLink} required/>
											</div>
											<div className="form-controls-group-inner">
												<label htmlFor="project-length-hours">Length (Hours)</label>
												<input type="number" name="projectLengthHours" id="project-length-hours"
															 onChange={this.handleChange} value={projectLengthHours} min="0" required/>
											</div>
											<div className="form-controls-group-inner">
												<label htmlFor="project-length-minutes">Length (Minutes)</label>
												<input type="number" name="projectLengthMinutes" id="project-length-minutes"
															 onChange={this.handleChange} value={projectLengthMinutes} min="0" required/>
											</div>
											<div className="form-controls-group-inner">
												<label htmlFor="project-access-level">Access Level</label>
												<select id="project-access-level" name="projectAccessLevel" onChange={this.handleChange}
																value={projectAccessLevel} required>
													<option value="free">Free</option>
													<option value="pro">Pro</option>
												</select>
											</div>
											<div className="form-controls-group-inner">
												<label htmlFor="project-image">Demo Image URL</label>
												<input type="text" onChange={this.handleChange} value={projectImageURL} name="projectImageURL"
															 required/>
											</div>
										</div>
									</fieldset>
									<div className="form-button-container">
										<button type="submit"
														className="button button-small button-accent-outline">Update Project
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

export default EditProject;
