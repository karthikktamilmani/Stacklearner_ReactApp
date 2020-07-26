# Assignment 4: StackLearner

* Date Created: 02 07 2020
* Last Modification Date: 25 07 2020

## Getting Started

* Deployment URL: https://stacklearner-a4-csci5709.herokuapp.com/
* Repository URL: https://git.cs.dal.ca/dpandya/group17-stacklearner-a4

## Features: Author's and Tasks

### Your Name

#### Your Feature

**Back-End Service: Your Feature**

**Front-End Components: Your Feature**

### Mansoor Ghazi
As part of this assignment, I was responsible for developing, testing, and integrating the *Learning Path* feature. The feature is briefly presented in the following discussion.

#### Learning Path Feature
The **Learning Path** feature enables students to access a dashboard, that gives them access to the projects, and their tutorials. 

The feature is composed of a back-end service, and a set of front-end components, the directory listings for which are presented in the following sections.

**Back-End Service: Learning Path Feature**
The **Learning Path** feature’s back-end includes the following directories and files:
```
|------ express-server
	|---- modules
		|---- learningpath
			|---- learningpath.controllers.js
			|---- learningpath.routers.js
	|---- models
		|--- learningpath.models.js
```
As evident from above, the feature’s back-end service consists of models, controllers, and routes.

**Front-End Components: Learning Path Feature**
The **Learning Path** feature’s front-end is made up of a set of React components. These components are organised as follows:
```
|------ react-client
	|---- src
		|---- components
			|---- StudentDashboard
				|---- Header.js
				|---- Hero.js
				|---- Main.js
				|---- Projects.js
				|---- Project.js
				|---- StudentDashboard.js
			|---- Curriculum
				|---- Curriculum.js
				|---- Header.js
				|---- Main.js
				|---- TutorialPlayer.js
```
The feature’s components are organised into two different set of components: `StudentDashboard` and `Curriculum`.

### Devarshi Pandya

#### Landing Page

**Back-End Service: Landing Page**
```
.
├── express-server
│   ├── modules
│   │   ├── landingpage
|   |   |   ├── landingpage.controllers.js
|   |   |   ├── landingpage.routers.js
│   ├── models 
├── react-client
```

**Front-End Components: Landing Page**
```
.
├── express-server
├── react-client
│   ├── src
│   │   ├── components
|   |   |   ├── LandingPage
|   |   |   |   ├── Header.js
|   |   |   |   ├── LandingPage.js
|   |   |   |   ├── Main.js
|   |   |   |   ├── ProjectCard.js
|   |   |   |   ├── Testimonials.js
```

## Code Referencing
No code was referenced from any online resource.

## Integration
A feature-based workflow was adopted that involved developing assigned features on separated branches, and then merging them on the master branch.

## Getting Started

* Deployment URL: https://stacklearner-v1.herokuapp.com/
* Repository URL: https://git.cs.dal.ca/dpandya/a2_devarshi_pandya

### Prerequisites

* To run this react application on your local machine, just clone the repository. You need Node.js on your local machine to run this react application.

### Libraries and Frameworks Used

* [React.js](https://reactjs.org/) - Frontend library
* [Reflex Grid](https://github.com/leejordan/reflex) - Responsive CSS library
* [Font Awesome 4](https://fontawesome.com/icons?d=gallery) - Icon library
* [Axios](https://www.npmjs.com/package/react-axios) - To make API requests
* [Node.js](https://nodejs.org/en/) - Backend framework
* [Express](https://expressjs.com/) - To create Node.js server
* [react-router-dom](https://www.npmjs.com/package/react-router-dom) - React routing library

### Installing

Install Node.js on the local machine. Open Visual Studio Code and type the following command:
```
npx create-react-app AppName
```
The react application is ready to use. Type the following commands to run it on your localhost.
```
cd MyApp
npm start
```
To run backend server, execute the following command to run it on your localhost.
```
node server.js
```

### W3C Compliance
The website is cross-browser compliant and the code used is W3C valid code.

### Deployment
The system has been deployed on Heroku using GitHub. with the below listed steps. You can follow these steps, after cloning the above stated GitLab repository, to separately deploy the front-end client and back-end server.

#### Front-End Client
Run the following command, to install the `serve` package.
```
npm install serve
```
Replace the scripts section in package.json with the following:
```
"scripts": {
    "dev": "react-scripts start",
    "start": "serve -s build",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "heroku-postbuild": "npm run build"
  },
```
Push the changes to your GitHub repository and deploy from Heroku App's web interface.

#### Back-End Server
To deploy the backend Node.js application, create a `Procfile` and add the following code to the file.
```
web: node server.js
```
Connect Heroku to the GitHub repository, and deploy the app.

