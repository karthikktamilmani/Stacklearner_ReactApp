# Assignment 4: StackLearner

* Date Created: 02 07 2020
* Last Modification Date: 25 07 2020

## Getting Started

* Deployment URL: https://stacklearner-a4-csci5709.herokuapp.com/
* Repository URL: https://git.cs.dal.ca/dpandya/group17-stacklearner-a4

## Authors & Their Features

* [Devarshi Pandya](devarshi.pandya@dal.ca) - (Maintainer)\
Location of implemented feature APIs - 
```
Landing Page
The contents of the landing page are fetched from MongoDB and displayed in the react application.
```
* [Daksh Patel](dk792765@dal.ca) - (Maintainer)\
Location of implemented feature APIs - 
```
Implemented the SuggestionsList component.
```
* [Karthik Tamil Mani](kr630601@dal.ca) - (Maintainer)\
Location of implemented feature APIs - 
```
Implemented the Info component.
```
* [Ravi Patel](rv526909@dal.ca) - (Maintainer)\
Location of implemented feature APIs - 
```
Student Progress Tracking
This feature will enable students to track their progress across multiple learning paths, projects, and tutorials. Students will be able to resume learning from where they last left, as well as reset their progress to start afresh.
```
* [Mansoor Ghazi](mansoor.ghazi@dal.ca) - (Maintainer)\
Location of implemented feature APIs - 
```
Implemented the Autosuggestion component and routing.
```


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

Install Node.js on the local machine.
Open Visual Studio Code and type the following command

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
The system has been deplyed on HerokuApp using GitHub. Deployment steps were:
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
  Push the changes to your GitHub repository and deploy from HerokuApp's web interface.

To deploy the backend Node.js application, create a Procfile and add this code to the file.
```
web: node server.js
```
Connect Heroku to the GitHub repository, and deploy the app.

