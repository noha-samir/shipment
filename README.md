# Shipments
<h3 align="center">

## 📝 Table of Contents

<!-- - [About](#about) -->
- [Notes](#Notes)
- [Design Patterns Used](#Design_Pattern)
- [Getting Started](#getting_started)
- [Deployment & Installing](#Deployment_Installing)
- [Dependencies](#Dependencies)
- [Running the tests](#Tests)
- [Built Using](#built_using)

## Notes <a name = "Notes"></a>
- There is a sample-env file for the local data to be added in the .env file
- My Application depending on a design pattern:
    - Factory Design Pattern >> which is a software design pattern we create object without exposing the creation logic to the client and refer to newly created object using a common interface.

## Design Patterns Used <a name = "Design_Pattern"></a>
  - [Factory Design Pattern](https://www.dofactory.com/javascript/design-patterns/factory-method)   

## Getting Started <a name = "getting_started"></a>

node and npm must be installed on your machine

## Deployment & Installing Env <a name = "Deployment_Installing"></a>

first deployment option

1- use the visual studio code 

2- clone project

3- Open a terminal window and type:

  cd /path-of-the-project

4- install dependencies

   - install node_modules "npm install","npm i node"
   - using npm start >> "npm start"
      >> Response in TERMINAL should be >>  
                       > Your app is listening on PORT: {YOUR_PORT}

   - using debugging mood >> "F5"
      >> Response in DEBUG CONSOLE should be >>  
                       > Your app is listening on PORT: {YOUR_PORT}

### Dependencies <a name = "Dependencies"></a>

- [async](https://www.npmjs.com/package/async)
- [jest](https://www.npmjs.com/package/jest)
- [joi](https://www.npmjs.com/package/joi)
- [compression](https://www.npmjs.com/package/compression)
- [express](https://expressjs.com/)

## 🔧 Running the tests <a name = "Tests"></a>

1- Test if server & main APIs are working by:
  - Run 'npm test' on terminal

2- Run endpoint using postman or any other tool 
  - The API will be attached in the project as a postman collection 
    named >> "Shipment.postman_collection.json", You can import it to postman.

## ⛏️ Built Using <a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
