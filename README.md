# Rekko

[![Website rekko.co](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://www.rekko.co/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/mohaimenhasan/Rekko/graphs/commit-activity)

Discover products you’ll love from a community you trust. A community based application allowing users to add product reviews and interact with a close friends & community on a trusted circle

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The following software with the specified versions, as mentioned below, need to be installed:
<li> Node.js </li>
<li> React </li>
<li> Express </li>
<li> Mongo </li>
<li> Heroku </li>

### Installing

A step by step series of examples that tell you how to get a development env running. Please run all the commands from app directory:

1. git clone the repository
```
git clone https://github.com/mohaimenhasan/Rekko.git
```
2. Create a mongoDB account and set up a DB (for testing and deployment)
3. Add the following configurations in a .env file on the main directory
```
MONGO_URI=<add your mongoDB URL here>
NODE_ENV=development/production (remember production would require https)
```
4. Install all the packages:
```
npm install (on the main directory)
cd/client/
npm install
```
5. If you want to run the app on development mode:

- For backend run the main server on nodemon: ``` npm run dev ``` (server runs on localhost 8888)
- For frontend run the client app: ```cd client && npm start``` (frontend app runs on localhost 3000)
6. If you want to have a production build:
```
cd client
npm run build
```
7. Start the server:
```
npm start.
```
Your app will be running on localhost:8888

## Deployment

To deploy it on heroku please sign in and request for access for the app: 
https://dashboard.heroku.com/pipelines/2687c3fb-6687-4b9c-b090-6000e5aa41d3

Live App Deployed at: https://www.rekko.co/

### Guidelines:
- Don't push to main. Create a PR and an associated app would automatically be available for you on the heroku pipeline
- Once you get atleast one approval, merge your code. Dev pipeline should automatically pick it up
- Promote the changes to staging and then to prod from heroku UI

## Built With

* MERN Framework
* Heroku

Built as a monolith. We plan on shifting to a microservice architecture in the future

## Authors

* **Mohaimen Khan** 
* **Arnav Goel**
* **Megan Mcquillan** 

See also the list of [contributors](https://github.com/mohaimenhasan/Rekko/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## Directory Structure

The project directory structure is as following: 
```
|__client/  ** THIS IS EVERYTHING FROM THE REACT SIDE **
    |__ node_modules/
        |__ tons of stuff...
    |__ public/
        |__ index.html
        |__ favicon.ico
        |__ etc.
    |__ src/
        |__ index.js
        |__ App.js/
        |__ Components ** INDIVIDUAL COMPONENTS **
            |__ SearchBar
            |__ CustomTextField
        |__ Pages ** DIFFERENT PAGES **
        |__ etc.
    |__etc.
|__ models/ ** DATA SCHEMAS **
    |__ user.model.js
    |__ etc.
|__ node_modules/
    |__ stuff...
|__ routes ** API ROUTES **
    |__ index.js
|__ controller ** API LOGIC **
    |__ index.controller.js
|__ .gitignore
|__ package.json
|__ app.js ** MAIN SERVER FILE **
|__ etc.
```
