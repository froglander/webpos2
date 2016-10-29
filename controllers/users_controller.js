var bcrypt = require('bcryptjs');
var models  = require('../models');
var express = require('express');
var router  = express.Router();

//this is the login_controller.js file
router.get('/new', function(req,res) {
  console.log("router.get new:", models.Person);
  res.render('users/new');
});

router.get('/sign-in', function(req,res) {
  res.render('users/sign-in');
});

router.get('/sign-out', function(req,res) {
  req.session.destroy(function(err) {
    res.redirect('/')
  })
});


// login
router.post('/sign-in', function(req, res) {
  console.log('post login');
  models.Person.findOne({
    where: {email: req.body.email}
  }).then(function(user) {
    console.log("email:", user.email);

    if (user == null){
      res.redirect('/users/sign-in')
    }

    // Use bcrypt to compare the user's password input
    // with the hash stored in the user's row.
    // If the result is true,
    bcrypt.compare(req.body.password, user.passwordHash, function(err, result) {
      console.log("check password:", result);
      // if the result is true (and thus pass and hash match)
      if (result == true) {
        // Now we need to retrieve the EmployeeID as well
        models.Employee.findOne({where: {PersonId: user.id}})
        // Finally we set the session values
            .then(function (mySessionUser) {
              req.session.logged_in = true;
              // the email/username to the session
              req.session.username = user.email;
              // the employee id to the session
              req.session.employee_id = mySessionUser.id;
              // Write them all to the terminal to check
              console.log("sign-in logged_in", req.session.logged_in);
              console.log("sign-in username:", req.session.username);
              console.log("sign-in employee_id:", req.session.employee_id);
              // Redirect to home page after new user creation
              res.redirect('/pos')
            })
      }
      // if the result is anything but true (password invalid)
      else{
        // redirect user to sign in
        res.redirect('/users/sign-in')
      }
    })
  })
});


/* ******************************************************************** */
// Register a new employee
// First, Insert into Person table, then retrieve that Person.Id value
// and insert a new record into Employee table with Person.Id as a
// foreign key
// Email should be a unique value
/* ******************************************************************** */
router.post('/create', function(req,res) {
  // First check if that email address is already in the system
  models.Person.findAll({
    where: {email: req.body.email}
  }).then(function (users) {
    if (users.length > 0) {
      console.log(users);
      res.send('we already have an email or username for this account')
    } else {
      // Using bcrypt, generate a 10-round salt,
      // then use that salt to hash the user's password.
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          // Using the Person model, create a new person,
          // storing the email they sent and the hash you just made
          models.Person.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone: req.body.phone,
            email: req.body.email,
            passwordHash: hash
          })
          // Next we need to retrieve the Person.Id for the Person we just created
              .then(function (user) {
                models.Person.findOne({where: {email: user.email}})
                // So we can make a corresponding Employee record linked to the Person
                // we just created
                // (for now, this functionality will only be for Employees)
                    .then(function (myUser) {
                      models.Employee.create({
                        startDate: req.body.startDate,
                        salary: req.body.salary,
                        role: req.body.role,
                        isHourly: 0,
                        PersonId: myUser.id
                      })
                      // Then we need to retrieve the newly created employee ID value
                          .then(function (myEmp) {
                            models.Employee.findOne({where: {PersonId: myUser.id}})
                            // Finally we set the session values
                                .then(function (mySessionUser) {
                                  req.session.logged_in = true;
                                  // the email/username to the session
                                  req.session.username = user.email;
                                  // the employee id to the session
                                  req.session.employee_id = mySessionUser.id;
                                  // Write them all to the terminal to check
                                  console.log("req.session.logged_in", req.session.logged_in);
                                  console.log("username:", req.session.username);
                                  console.log("employee_id:", req.session.employee_id);
                                  // Redirect to home page after new user creation
                                  res.redirect('/pos')
                                })
                          })
                    })
              })
        })
      })
    }
  })
});


module.exports = router;
