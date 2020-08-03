import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../authentication/axios-user-management';
import ModuleCard from './ModuleCard';
import Loading from '../Common/Loading';

class Modules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleNumber: 0,
            moduleTitle: '',
            modules: [],
            loading: true
        }
    }

    loadModules = async () => {
        const { projectID } = this.props;
        console.log(projectID);
        return await axios.get(`instructionmanagement/projects/${projectID}/modules`);
    }

    componentDidMount() {
        this.loadModules().then((result) => {
            if (result.status === 200) {
                console.log(result);
                this.setState({
                    moduleNumber: result.data.length + 1,
                    modules: result.data,
                    loading: false
                });
            }
        }).catch((err) => {
            this.setState({
                error: true
            });
        });
    }

    displayModules = () => {
        const { modules, loading, error } = this.state;
        if (modules.length > 0) {
            return modules.map((module, index) => {
                return <ModuleCard key={module._id} moduleNumber={index+1} {...module} />
            });
        } else if (loading && modules.length === 0 && !error) {
            return <Loading message={"Loading modules..."} />
        } else if (!loading && modules.length === 0 && !error ) {
            return <p className="text-center">No modules and tutorials created yet.</p>
        } else if (error) {
            return <p className="alert alert-danger" role="alert">We encountered an error while loading your modules.</p>
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })
    }

    saveModuleToDB = async (module) => {
        return await axios.post('instructionmanagement/modules/createmodule', module);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { modules, moduleNumber, moduleTitle } = this.state;
        const moduleProjectID = this.props.projectID;
        const moduleToCreate = { moduleNumber, moduleTitle, moduleProjectID}

        this.saveModuleToDB(moduleToCreate).then((result) => {
            if (result.status === 201) {
                modules.push(result.data);
                this.setState({
                    moduleNumber: modules.length + 1,
                    moduleTitle: '',
                    modules: modules
                });
            }
        }).catch(() => {
            this.setState({
                error: true
            });
        });
    }

    render() {
        const { moduleNumber, moduleTitle, modules, loading } = this.state;

        return (
            <section className="learning-path-section add-edit-curriculum-section gray-background">
                <div className="container">
                    <div className="grid">
                        <div className="col-md-8 offset-md-2 col-sm-12 back-button-container">
                            <i className="fas fa-angle-left"></i><Link to="/instructor/dashboard" aria-label="Go back to the dashboard" className="text-link text-link-blue text-link-small"><span>Instructor's Dashboard</span></Link>
                        </div>
                        <div className="col-md-8 offset-md-2 col-sm-12 add-edit-curriculum-container">
                            <h5>Curriculum: {this.props.projectTitle}</h5>
                            <hr className="thin"/>
                            {this.displayModules()}
                            <div className="add-module-form-container">
                                <form className="add-module-form" onSubmit={this.handleSubmit}>
                                    <input type="number" name="moduleNumber" value={moduleNumber} onChange={this.handleChange} min="1" required hidden />
                                    <input type="text" onChange={this.handleChange} value={moduleTitle} name="moduleTitle" placeholder="Module name"/>
                                    <button type="submit"><i className="fas fa-check-circle"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Modules;