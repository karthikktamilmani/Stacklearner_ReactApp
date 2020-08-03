import React, {Component} from 'react';
import {Col, Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Ratings from "./Ratings";

class FeedbackModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ratings: 2,
			comments: "",
			error: false,
			message: "",
			success: false
		}
	}

	setRatingsValue = (value) => {
		this.setState({
			ratings: value
		});
	}

	handleChange = (event) => {
		const {name, value} = event.target;
		this.setState({
			[name]: value
		})
	}

	closeBanner = (event) => {
		const bannerIcon = event.target;
		const banner = bannerIcon.parentNode;
		banner.classList.remove('visible');
		banner.classList.add('hidden');
		this.setState({
			updated: 'NotYet'
		});
	}

	render() {
		return (
			<div>
				<Modal show={this.props.show} onHide={this.props.closeModal}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Row>
								<Col md={3}>
									<Form.Label className="p-0 pb-2">Ratings:</Form.Label>
								</Col>
								<Col md={8}>
									<div id="ratings" className="ml-2">
										<Ratings handleChange={this.setRatingsValue}/>
									</div>
								</Col>
							</Form.Row>
							<Form.Row>
								<Col md={3}>
									<Form.Label className="p-0 pb-2">Comments:</Form.Label>
								</Col>
								<Col md={8}>
									<Form.Control name="comments" onChange={this.handleChange} as="textarea" rows="3" required/>
								</Col>
							</Form.Row>
							<p
								className={this.state.success ? "visible flash-banner green-background" : "hidden"}>{this.state.message}<i
								className="fas fa-times" onClick={this.closeBanner}/></p>
							<p
								className={this.state.error ? "visible flash-banner pink-background" : "hidden"}>{this.state.message}<i
								className="fas fa-times" onClick={this.closeBanner}/></p>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.props.closeModal}>
							Close
						</Button>
						<Button variant="primary" onClick={() => {
							if (this.state.comments.trim().length > 0) {
								this.setState({
									error: false,
									success: true,
									message: "Thank you for your feedback :)"
								});
								this.props.onSubmitHandler(this.state.ratings, this.state.comments)
							} else {
								this.setState({
									error: true,
									success: false,
									message: "Please enter comments"
								});
							}
						}}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default FeedbackModal;
