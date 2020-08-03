import React, {Component} from 'react';
import Header from './Header';
import Modules from './Modules';
import Footer from '../Common/Footer';

const ProjectCurriculum = (props) => {
    return (
        <>
            <Header />
            <Modules projectTitle={props.match.params.projectTitle} projectID={props.match.params.projectID} />
            <Footer />
        </>
    );
}

export default ProjectCurriculum;