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
                <Header />
                <Main />
                <Footer />
            </>
        );
    }
}

export default InstructorDashboard;