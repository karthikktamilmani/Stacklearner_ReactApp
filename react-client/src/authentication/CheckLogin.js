// Author: Daksh Patel

import React, {Component, Fragment} from "react";
import {Redirect, withRouter} from 'react-router-dom';
import auth from './Auth';

// The protected route is a wrapper that is used to protect the routes which
// requires the user authentication. It renders its child if and only if the
// user is authenticated by calling auth.isAuthenticated()
class CheckLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			isAuthenticated: true
		}
	}

	componentDidMount() {
		// this.verifyToken()
		console.log('component did mount called')
		const {children} = this.props
		this.childrenPaths = [];
		React.Children.forEach(children, element => {
			if (!React.isValidElement(element)) return

			const {source} = element.props
			// console.log("element",element);
			// console.log(source);
			this.childrenPaths.push(element.props.path);
			//do something with source..
		})
		auth.isAuthenticated(this.successCallback, this.failureCallback)
	}

	successCallback = () => {
		console.log('success callback called')
		this.setState({
			loading: false,
			isAuthenticated: false
		})
	}
	failureCallback = () => {
		console.log('failure callback called')
		this.setState({loading: false})
	}

	render() {
		const {loading, isAuthenticated} = this.state
		const {children, location} = this.props
		let childrenPaths = [];
		let i;
		for (i in children) {
			let child = children[i];
			// console.log(child);
			childrenPaths.push(child.props.path);
		}
		// console.log(childrenPaths);

		// console.log(children);

		if (childrenPaths.includes(location.pathname) && !isAuthenticated) {
			console.log('inside if of children path');
			return children;
		}
		if (loading) {
			// return <Loading message={"Checking user login state"}/>
			return <div>Loading</div>
		}
		console.log(children);
		return <Fragment>
			{!isAuthenticated
				? children
				: <Redirect to={{pathname: "/student/dashboard", state: {from: location}}}/>
			}
		</Fragment>
	}
}

export default withRouter(CheckLogin)
