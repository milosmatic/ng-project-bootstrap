AngularJS Project Bootstrap
===========

* Folder structure 
* Grunt setup: development (watch) and deploy tasks
* Bower setup


## Setup
`$ npm install` will install all necessary dependencies for Grunt

`$ bower install` will install all necessary Bower packages


## Development
In first terminal window start:
`$ npm start` to run from build folder and start the app on http://localhost:3001

In second terminal window start:
`$ grunt watch` will watch any changes in app folder and rebuild the project with development settings 


## Builds

### Development

`$ grunt build` will build the project with development settings and place it in the build folder

### Production

`$ grunt deploy` will build the project with production settings and place it in the build folder