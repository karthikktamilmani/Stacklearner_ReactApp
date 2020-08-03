// Import data models
const { Project, Module, Tutorial } = require('../../models/learningpath.models');

// PROJECT RESOURCE Controllers

// Controller - Fetch all projects from DB sorted by projectNumber
const getAllProjects = async (req, res) => {
    const query = Project.find({}, {_v: 0}).sort({projectNumber: 1});

    try {
        const result = await query.exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Fetch total number (count) projects from DB sorted by projectNumber
const getProjectsCount = async (req, res) => {
    const query = Project.aggregate([{
        $count: "projectsCount"
    }]);

    try {
        const result = await query.exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Fetch a single project from DB
const getOneProject = async (req, res) => {
    const { projectID } = req.params;
    const query = Project.findById(projectID);

    try {
        const result = await query.exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Create a new project in DB
const createProject = async (req, res) => {
    let project = req.body;
    console.log(project);
    const projectModel = new Project(project);

    try {
        const result = await projectModel.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Update a project in DB
const updateProject = async (req, res) => {
    const { projectID } = req.params;
    const updatedFields = req.body;
	console.log(updatedFields);
    const query = Project.findByIdAndUpdate(projectID, updatedFields, { new: true, useFindAndModify: false });

    try {
        const result = await query.exec();
			res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Delete a project from DB
const deleteProject = async (req, res) => {
    const { projectID } = req.params;
    const deleteProjectQuery = Project.findOneAndDelete({_id: projectID});

    try {
        const result = await deleteProjectQuery.exec();
        await Module.deleteMany({moduleProjectID: result._id});
        await Tutorial.deleteMany({tutorialProjectID: result._id});
        res.status(200).send();
    } catch (err) {
        res.status(400).send(err);
    }
}

// MODULE RESOURCE Controllers

// Controller - Fetch all nodules of a project, sorted by their number, from DB
const getAllModules = async (req, res) => {
    const { projectID } = req.params;
    const query = Module.find({moduleProjectID: projectID}).sort({moduleNumber: 1});

    try {
        const result = await query.exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Fetch a single module of a project from DB
const getOneModule = async (req, res) => {
    const { moduleID } = req.params;
    const query = Module.findById(moduleID);

    try {
        const result = await query.exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Create a new module for a project in DB
const createModule = async (req, res) => {
    const module = req.body;
    const moduleModel = new Module(module);

    try {
        const result = await moduleModel.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Update a module
const updateModule = async (req, res) => {
    const { moduleID } = req.params;
    const updatedFields = req.body;
    const query = Module.findByIdAndUpdate(moduleID, updatedFields, { new: true, useFindAndModify: false });

    try {
        const result = await query.exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Delete a module
const deleteModule = async (req, res) => {
    const { moduleID } = req.params;
    const deleteModuleQuery = Module.findOneAndDelete({_id: moduleID});

    try {
        const result = await deleteModuleQuery.exec();
        await Tutorial.deleteMany({tutorialModuleID: result._id});
        res.status(200).send();
    } catch (err) {
        res.status(400).send(err);
    }
}

// TUTORIAL RESOURCE Controllers

// Controller - Fetch all tutorials of a module, sorted by their number, from DB
const getAllTutorials = async (req, res) => {
    const { moduleID } = req.params;
    const query = Tutorial.find({tutorialModuleID: moduleID}).sort({tutorialNumber: 1});

    try {
        const result = await query.exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Fetch a single tutorial from DB
const getOneTutorial = async (req, res) => {
    const { tutorialID } = req.params;
    const query = Tutorial.findById(tutorialID);

    try {
        const result = await query.exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Create a new tutorial
const createTutorial = async (req, res) => {
    const tutorial = req.body;
    const tutorialModel = new Tutorial(tutorial);

    try {
        const result = await tutorialModel.save();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Update a tutorial
const updateTutorial = async (req, res) => {
    const { tutorialID } = req.params;
    const updatedFields = req.body;
    const query = Tutorial.findByIdAndUpdate(tutorialID, updatedFields, { new: true, useFindAndModify: false });

    try {
        const result = await query.exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Controller - Delete a tutorial
const deleteTutorial = async (req, res) => {
    const { tutorialID } = req.params;
    const deleteTutorialQuery = Tutorial.findOneAndDelete({_id: tutorialID});

    try {
        const result = await deleteTutorialQuery.exec();
        res.status(200).send();
    } catch (err) {
        res.status(400).send(err);
    }
}

// Export controllers as object's fields
module.exports = { getAllProjects, getProjectsCount, getOneProject, createProject, updateProject,  deleteProject, getAllModules,
    getOneModule, createModule, updateModule, deleteModule, getAllTutorials, getOneTutorial, createTutorial, updateTutorial, deleteTutorial };
