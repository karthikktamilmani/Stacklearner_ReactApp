import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from '../Common/Footer';
import auth from '../../authentication/Auth';

class InstructorDashboard extends Component {
    clearLocalStorage = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <>
                <Header clearLocalStorage={this.clearLocalStorage} firstName={auth.user.firstName}/>
                <Main />
                <Footer />
            </>
        );
    }
}

export default InstructorDashboard;