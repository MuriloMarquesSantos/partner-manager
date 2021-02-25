<h3 align="center">
    <img alt="Logo" title="#logo" width="150px" src="/assets/ze-delivery.png">
    <br>
</h3>

# Partner Manager

- [Purpose](#purpose)
- [Technologies](#techs)
- [Requirements](#reqs)
- [Architecture](#architecture)
- [Local Configuration](#localconfig)
- [Testing](#testing)
- [Postman Doc](#postman)
- [Possible improvements](#improvements)

<a id="purpose"></a>
## Purpose

This system was created to enable Partner management. It provides three main functionalities:
 - Create a partner
 - Search partner by ID
 - Search the nearest available partner

<a id="techs"></a>
## Technologies Used

- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/) to connect and manage DB
- [Sinon](https://sinonjs.org/) and [Jest](https://jestjs.io/) for testing
- [Express](https://expressjs.com/) as Microweb framework
- [Docker](https://www.docker.com/)

<a id="reqs"></a>
## Requirements
- Docker and docker-compose is all you need, all the dependecies with be loaded into the container

<a id="architecture"></a>
## Architecture and directories

I have tried to keep the layers as isolated as possible given pure Javascript/NodeJS limitations.
The idea is to follow Clean architecture principles to isolate domain and bring ease to new changes/features

```
Project
├── src
│   ├── core: Domain of application, contains services with business rules, domain objects, and DTO to communicate with outside.
│   ├── web: Controllers and routes to communicate with customers/users
│   ├── infrastructure: Database and other possible external services configuration
│   ├── server.js: Main app file, exposes routes.  
|── tests
|   ├── unit: Spring components with business logic.          
│   ├── integration: utilities that can be shared cross application 
|── config: database connection and configuration
|
├── index.js: EntryPoint of application. Starts server connection
├── .env: Contains environment configuration such as: Port used and database URL.
├── package.json: File that manages all the dependecies and contains script definitions.

```
<a id="localconfig"></a>
## Local Configuration

- After cloning the project, installing docker and docker-compose, enter in the project root and run the following commands:
```sh
  ## Run docker-compose to start containers. It will start database, database-interface and the application server.
  $ docker-compose -f docker-compose.test.yml up --build
```
- By default application will be started at port 3333, but you can change it in .env file.
- Mongo-express (DB UI) will be loaded at port 8081. You will be able to manage several aspects of your mongo database with it.
- You can also use another Mongo SGBD, default Mongo URL is located in .env file.

<a id="testing"></a>
### Testing
- Unit and integrations tests, shall be ran in a separate container. Run the following commands to access it:
```sh
  $ docker-compose -f docker-compose.test.yml up --build
  ## During the first time, it will take longer than normal because container will download dependencies
```
<a id="postman"></a>
## Postman Documentation

I have prepared a postman documentation, in which you will be able to check in details each endpoint and possible Requests and responses.

Please access it by link below:

https://documenter.getpostman.com/view/4694407/TWDamayo

<a id="purpose"></a>
## Possible Improvements

A system is never perfect and there is always room for improvement. Here are some points that I would like to enhance if I had more time:

- Include a Dependency Injection framework so the code can be more organized;
- Include a superset to enable the use of interfaces to enhance clean architecture concepts, such as Typescript.
- Integration tests speed could be improved

## Support

* If you have any query or doubt, please, feel free to contact me by e-mail.
