# Assignment 4: StackLearner

* Date Created: 02 07 2020
* Last Modification Date: 25 07 2020

## Getting Started

* Deployment URL: https://stacklearner-a4-csci5709.herokuapp.com/
* Repository URL: https://git.cs.dal.ca/dpandya/group17-stacklearner-a4

## Authors & Their Features

* [Daksh Patel](dk792765@dal.ca) - (Maintainer)\
Location of implemented feature APIs -
```
Implemented the complete user management feature. User management feature includes the following:

• Signup
• Signin
• Signout
• User Authentication
• Update profile
• Forgot Password

The files I have worked on are as follow:
.
├── express-server
│   ├──globals.js                   # added createResponse method for global usage
│   ├── modules
│   │   ├── authentication          # Made all the files in "./express-server/modules/authentication/*"
│   │   ├── mailer                  # Made all the files in "./express-server/modules/mailer/*"
│   │   ├── usermanagement          # Made all the files in "./express-server/modules/usermanagement/*"

│   ├── models
│   │   ├── authtoken.model.js      # Made the models file for authentication token management.
│   │   ├── forgotpassword.model.js # Made the models file for forgot password management.
│   │   ├── role.model.js           # Made the models file for role management.
│   │   ├── user.model.js           # Made the models file for user information management.
├── react-client
│   ├── src
│   │   ├── authentication          # Made all the files in "./react-client/src/authentication/*"
│   │   ├── components
│   │   │   ├── StudentProfile      # Made the following files in "./react-client/src/components/StudentProfile/"
│   │   │   │   ├── SignUp.js
│   │   │   │   ├── SignIn.js
│   │   │   │   ├── StudentProfile.js
│   │   │   │   ├── UpdateProfile.js
└── README.md
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
Open terminal and type the following command

```
git clone https://git.cs.dal.ca/dpandya/group17-stacklearner-a4.git
```

```
cd group17-stacklearner-a4/react-client
```

```
npm install
npm start
```

The react application is ready to use and using the backend hosted on heroku at https://stacklearner-a4.herokuapp.com/


To run backend server (locally), execute the following command to run it on your localhost after navigating to the root directory of the project.

```
cd express-server
npm install
npm start
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

### Code Referencing
No code was referenced from any online resource.

### Integration
A feature-based workflow was adopted that involved developing assigned features on separated branches, and then merging them on the master branch
