const app = require('./app');

//Create our server listen to our PORT.
var server = app.listen(process.env.PORT, function () {
    console.log(`Your app is listening on PORT:${process.env.PORT}`);
});

module.exports = server;