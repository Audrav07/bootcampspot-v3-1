//grabbing our sequelize models
var db = require('../models');

//bringing in the bcrypt npm module
var bcrypt = require('bcrypt');

module.exports = function(app) {

    //login endpoint
    app.post("/api/login", function(req, res) {
        //will show our user data from front end
        console.log("this is the response", req.body);
        //will see the currently formatted session object with user data
        console.log(req.session);
        //initalizing user data variable to an empty object. this will hold our user data on this endpoint
        var student = {};
        //using our Student model to query our MySQL database for user info where ther user equals the user we passed in from the front end
        db.Student.findOne({
                where: {
                    user: req.body.user
                }
            })
            .then(function(dbData) {
                //if the database does not find a user with that user we will revice a null value from our database. null values are a little "special" in relation to JS.
                //this is how we would correctly do a check for a null value if recieved
                if (!dbData && typeof dbData === "object") {
                    //this will send an error code to our front end for the user not existing
                    res.status(404).send('ohhh no, there is a problem with the user or password!');
                } else {
                    //here we bring in bcrypt. bcrypt's compair method asks for a few things. it asks for the first parameter you send in a plain text password. 
                    //AKA: our users password coming in from the front end. the second parameter bcrypt wants us to pass in the hashed password that we stored in the db. lastly it wants a callback funtion
                    //bcrypt will hash the pasword coming in from the front end and compaire it to the users hashed password from our database it will give us a boolean value to let us know if the 
                    //passwords were the same
                    bcrypt.compare(req.body.password, dbData.dataValues.password, function(err, bcryptRes) {
                        console.log("user defined password:", req.body.password);
                        console.log("database Password:", dbData.dataValues.password);
                        console.log(bcryptRes);

                        //if the response is false send an error to the front end letting the user know that the passwords did not match.
                        if (bcryptRes !== true) {
                            console.log(req.body.password, dbData.dataValues.password);

                            res.status(404).send("ohhh no, there is a problem with the user or password but its real!");

                        } else {
                            console.log("Whoo");
                            //if the response from bcrypt was true we know our users password matched and we can now format the user data coming from the database to be sent to the font end
                            var studentObj = { id: dbData.dataValues.id, name: dbData.dataValues.first_name + dbData.dataValues.last_name, user: dbData.dataValues.user };

                            //we update the loggedIn key to have a true value. we can use this value on the fron end to see if the user is logged in or not.
                            req.session.Student.loggedIn = true;

                            //here the session's user object is updated with the users data. we can hit our /session endpoing witha  get request from the front end and get our user object.
                            req.session.Student.currentUser = studentObj;

                            console.log(dbData.dataValues);
                            res.json({ status: 200 });
                        }
                    });
                }
            });
    });

    // signUp enpoint logic
    app.post("/api/signUp", function(req, res, next) {
        console.log(req.body);
        //to store a hased password into the database we need to first salt our password. this will tell bcrypt how many time to pass through the users password to generate the hash
        bcrypt.genSalt(10, function(err, salt) {
            //the bcrypt hash method will then 
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                // Store hash in your password DB.
                req.body.password = hash;
                db.Student.create(req.body).then(function(dbData) {
                    var studentObj = {
                        id: dbData.dataValues.id,
                        name: dbData.dataValues.first_name + dbData.dataValues.last_name,
                        user: dbData.dataValues.user,
                        password: dbData.dataValues.password
                    };
                    req.session.Student.loggedIn = true;
                    req.session.Student.currentUser = studentObj;
                    res.json(dbData);

                });
            });
        });
    });
    //endpoint for grabbing session user object to be used accrossed entire app.
    app.get("/api/session", function(req, res, next) {
        res.json(req.session.Student);
    });

    //get user info endpoint via query params
    app.get('/api/profile/:user', function(req, res, next) {
        console.log(req.param);
        db.Student.findOne({
            where: {
                user: req.params.user
            }
        }).then(function(dbData) {
            console.log(dbData);
            var userObj = {
                id: dbData.dataValues.id,
                name: dbData.dataValues.first_name + dbData.dataValues.last_name,
                user: dbData.dataValues.user,
            };
            req.session.user.loggedIn = true;
            req.session.user.currentUser = userObj;
            res.json(userObj);
        });
    });
    //update profile route
    /*app.put('/api/update/:user', function(req, res, next) {
        req.session.user.currentUser = req.body;
        var loggedUser = req.session.user.currentUser;
        if (true) {
            db.users.update({
                user: loggedUser.user,
                name: loggedUser.name,
                email: loggedUser.email,
            }, {
                where: {
                    user: req.params.user
                }
            }).then(function(dbData) {
                res.json(dbData.dataValues);
            });
        } else {
            res.status(404).json("please log in to update profile");
        }
    });*/
};