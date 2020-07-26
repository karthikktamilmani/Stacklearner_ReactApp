import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from '../Common/Footer';

class LandingPage extends Component {
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

export default LandingPage;