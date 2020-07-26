/* Import code dependencies. In this case, these are 
learning path module's data models. */
const { Project, Module, Tutorial } = require('../../models/learningpath.models');

// Controller to get all projects from the Projects collection
function getAllProjects(req, res) {
    // Create query to find all projects
    const query = Project.find({})

    // Execute query and return array of projects
    query.exec((err, projects) => {
        if (err) {
            res.status(400).json({ message: `Following error was encountered: ${err}` });
        } else if (!projects) {
            res.status(404).send('No projects found.');
        }else {
            res.status(200).json(projects);
        }
    });
}

// Controller to get a single project from Projects collection
function getOneProject(req, res) {
    // Get projectID from query parameters and create a findById query
    const projectID = req.params.projectID;
    const query = Project.findById(projectID)

    // Execute query - return project and its modules
    query.exec((err, project) => {
        if (err) {
            res.status(400).json({ message: `Following error was encountered: ${err}` });
        } else if (!project) {
            res.status(404).send('Project not found.');
        } else {
            res.status(200).json(project);
        }
    });
}

// Controller to create a project in the Projects collection
function createProject(req, res) {
    // Instantiate Project object
    const projectToSave = new Project(req.body);

    // Save Project
    projectToSave.save().then(() => {
        res.status(200).send('Project saved.')
    }).catch((err) => {
        console.log(err)
    });
}

// Controller to update a project
function updateProject(req, res) {
    // Get projectID from query parameters
    // Create query to find and update the project
    const projectID = req.params.projectID;
    const query = Project.findByIdAndUpdate(projectID, req.body, { new: true }, {useFindAndModify: false });

    // Execute query
    query.exec((err) => {
        if (err) {
            res.status(400).json({ message: `Following error was encountered: ${err}` });
        } else {
            res.status(200).send('Project updated.');
        }
    });
}

// Controller to delete a project and its modules
function deleteProject(req, res) {
    // Get projectID from query parameters
    // Create query to remove the project
    // Create query (deleteModuleQuery) to find and delete all modules
    const projectID = req.params.projectID;
    const deleteProjectQuery = Project.findByIdAndRemove(projectID, { useFindAndModify: false });
    const deleteModuleQuery = Module.deleteMany({ projectID: projectID });

    // First execute the deleteProjectQuery, THEN the deleteModuleQuery
    deleteProjectQuery.exec((err) => {
        if (err) {
            res.status(400).json({ message: `Following error was encountered: ${err}` });
        } else {
            deleteModuleQuery.exec((err) => {
                if (err) {
                    res.status(400).json({ message: `Following error was encountered: ${err}` });
                } else {
                    res.status(200).send('Project deleted.');
                }
            });
        }
    })

}

// MODULE RESOURCE CONTROLLERS

// Controller to get all modules of a project from the Modules collection
function getAllModules(req, res) {
    // Get projectID from query parameters to fetch only project's modules
    // Create query to get modules by projectID 
    const moduleProjectID = req.params.projectID;
    const query = Module.find({moduleProjectID});

    //  Execute query and return all modules that have the same projectID
    query.exec((err, modules) => {
        if (err) {
            res.status(400).json({ message: `Following error was encountered: ${err}` });
        } else if (!modules) {
            res.status(404).send('No modules found.');
        }else {
            res.status(200).json(modules);
        }
    });
}

// Controller to create a module - module references its parent project
function createModule(req, res) {
    // Get projectID from query parameters - Module will be saved with this projectID
    // Create Module object from request body
    // Add projectID property to moduleToSave
    const projectID = req.params.projectID;
    const moduleToSave = new Module(req.body);
    moduleToSave.moduleProjectID = projectID;

    // Save module to Modules collection
    moduleToSave.save().then(() => {
        res.status(200).send('Module saved.')
    }).catch((err) => {
        res.status(400).json({ message: `Following error was encountered: ${err}` });
    });
}

// Controller to update a module
function updateModule(req, res) {
    // Get ID of the module to update from the query parameters
    // Create query to update module
    const moduleID = req.params.moduleID;
    const query = Module.findByIdAndUpdate(moduleID, req.body, { new: true }, {useFindAndModify: false });

    // Execute query
    query.exec((err) => {
        if (err) {
            res.status(400).json({ message: `Following error was encountered: ${err}` });
        } else {
            res.status(200).send('Module updated.');
        }
    });
}

// Controller to delete a module
function deleteModule(req, res) {
    // Get ID of the module to delete from the query parameters
    // Create query to delete module that has the above moduleID
    const moduleID = req.params.moduleID
    const query = Module.findByIdAndRemove(moduleID, { useFindAndModify: false });

    // Execute query to delete module from Modules collection
    query.exec((err) => {
        if (err) {
            res.status(400).json({ message: `Following error was encountered: ${err}` });
        } else {
            res.status(200).send('Module deleted.');
        }
    });
}

// TUTORIAL RESOURCE CONTROLLERS

// Controller to get a tutorial
function getOneTutorial(req, res) {
    // Get tutorialID from query parameters and create a findById query
    const tutorialID = req.params.tutorialID;
    const query = Tutorial.findById(tutorialID)

    // Execute query - return project and its modules
    query.exec((err, tutorial) => {
        if (err) {
            res.status(400).json({ message: `Following error was encountered: ${err}` });
        } else if (!tutorial) {
            res.status(404).send('Tutorial not found.');
        } else {
            res.status(200).json(tutorial);
        }
    });
}

// Controller to get all tutorials of a project
function getTutorialsOfProject(req, res) {
    // Get projectID from query parameters to fetch only project's tutorials
    // Create query to get tutorials by projectID 
    const tutorialProjectID = req.params.projectID;
    const query = Tutorial.find({tutorialProjectID});

    //  Execute query and return all modules that have the same projectID
    query.exec((err, tutorials) => {
        if (err) {
            res.status(400).json({ message: `Following error was encountered: ${err}` });
        } else if (!tutorials) {
            res.status(404).send('No tutorials found.');
        }else {
            res.status(200).json(tutorials);
        }
    });
}

// Controller to get a specific tutorial of a project
function getOneTutorialOfProject(req, res) {
    res.send('Getting tutorial of a project');
}

// Controller to get all tutorials of a module
function getTutorialsOfModule(req, res) {
    // Get projectID from query parameters to fetch only project's tutorials
    // Create query to get tutorials by projectID 
    const tutorialModuleID = req.params.moduleID;
    const query = Tutorial.find({tutorialModuleID});

    //  Execute query and return all modules that have the same projectID
    query.exec((err, tutorials) => {
        if (err) {
            res.status(400).json({ message: `Following error was encountered: ${err}` });
        } else if (!tutorials) {
            res.status(404).send('No tutorials found.');
        }else {
            res.status(200).json(tutorials);
        }
    });
}

// Controller to create a tutorial
function createTutorial(req, res) {
    // Get projectID from query parameters - Tutorial will be saved with this projectID
    // Get moduleID from query parameters - Tutorial will be saved with this moduleID
    // Create Tutorial object from request body
    // Add projectID property to tutorialToSave
    // Add moduleID property to moduleToSave
    const projectID = req.params.projectID;
    const moduleID = req.params.moduleID;
    const tutorialToSave = new Tutorial(req.body);
    tutorialToSave.tutorialProjectID = projectID;
    tutorialToSave.tutorialModuleID = moduleID;

    // Save tutorial to tutorials collection
    tutorialToSave.save().then(() => {
        res.status(200).send('Tutorial saved.')
    }).catch((err) => {
        res.status(400).json({ message: `Following error was encountered: ${err}` });
    });
}

// Export controllers through object export pattern
module.exports = { getAllProjects, getOneProject, createProject, deleteProject, updateProject, getAllModules, createModule, updateModule,  deleteModule, createTutorial, getOneTutorial, getTutorialsOfProject, getOneTutorialOfProject, getTutorialsOfModule };