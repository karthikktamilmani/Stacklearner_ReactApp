import React, { Component, Fragment } from "react";
import { Redirect, withRouter } from 'react-router-dom';
import auth from './Auth';

class ProtectedRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			isAuthenticated: false
		}
	}

	componentDidMount() {
		// this.verifyToken()
		auth.isAuthenticated(this.successCallback,this.failureCallback)
	}

	successCallback=()=>{
		this.setState({
			loading: false,
			isAuthenticated: true
		})
	}
	failureCallback=()=>{
		this.setState({loading: false})
	}

	render() {
		const {loading, isAuthenticated} = this.state
		const {children, location} = this.props

		if (loading) {
			return <div>Loading</div>
		}

		return <Fragment>
			{isAuthenticated
				? children
				: <Redirect to={{pathname: "/",state: {from: location}}}/>
			}
		</Fragment>
	}
}

export default withRouter(ProtectedRoute)
