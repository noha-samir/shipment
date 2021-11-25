# Products-ordering
<h3 align="center">

## 📝 Table of Contents

<!-- - [About](#about) -->
- [Notes](#Notes)
- [Design Patterns Used](#Design_Pattern)
- [API Documentation](#API_Documentation)
- [Getting Started](#getting_started)
- [Deployment & Installing](#Deployment_Installing)
- [Dependencies](#Dependencies)
- [Running the tests](#Tests)
- [Built Using](#built_using)
- [DataBase](#DataBase)

## Notes <a name = "Notes"></a>
- The Class Structure Diagram will be attached to the app in Class Structure Diagram.drawio file.
- The swagger link for documented APIs >> https://app.swaggerhub.com/organizations/Product_Ordering
- There is a sample-env file for the local data to be added in the .env file
- My Application depending on 2 design patterns:
    - State Desingn Pattern >> which is a software design pattern that allows an object to alter its behavior when its internal state changes.
    - Factory Design Pattern >> which is a software design pattern we create object without exposing the creation logic to the client and refer to newly created object using a common interface.

## Design Patterns Used <a name = "Design_Pattern"></a>

  - [State Design Pattern](https://subscription.packtpub.com/book/web_development/9781783287314/4/ch04lvl1sec31/state) 
  - [Factory Design Pattern](https://www.dofactory.com/javascript/design-patterns/factory-method)   

## API Documentation <a name = "API_Documentation"></a>

https://app.swaggerhub.com/organizations/Product_Ordering

## Getting Started <a name = "getting_started"></a>

node and npm must be installed on your machine

## Deployment & Installing Env <a name = "Deployment_Installing"></a>

first deployment option

1- use the visual studio code 

2- use mysql database on your machine

3- clone project

4- Open a terminal window and type:

  cd /path-of-the-project

5- install dependencies

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
- [request](https://www.npmjs.com/package/request)

## 🔧 Running the tests <a name = "Tests"></a>

Test if server & DataBase & main APIs are working by:
  - Run npm test on terminal

Run endpoints using postman or any other tool 
  - APIs will be attached in the project as a collection 
    named >> "ProductOrdering.postman_collection.json"
    each API has its test cases to pass.

## ⛏️ Built Using <a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment

## DataBase <a name = "DataBase"></a>

- We will be using MySQL DB.
- [MySQL](https://www.mysql.com/) - DataBase
