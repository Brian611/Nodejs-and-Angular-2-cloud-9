const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

//Get All Users
router.get('/users', (req, res) => {
    res.set();
    res.set({
        'Accept': 'application/json',
        'X-Powered-By': 'Nodejs- Brian'
    });
    User.getAllUsers(function(err, users) {
        if (err) {
            res.status(500);
            res.json({
                success: false,
                msg: 'Failed to load users: ' + err + ' '
            })
        }
        else {
            res.status(200);
            res.send(users);
        }

    });
});
//Get Single User
router.get('/user/:name', (req, res) => {
    var firstName = req.params.name;
    res.set({
        'Accept': 'application/json',
        'X-Powered-By': 'Nodejs- Brian'
    });
    User.getUserByFirstName(firstName, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed getting user'
            });
        }
        else {
            if (user.length == 0) {
                res.status(404);
                res.json({
                    success: false,
                    msg: 'User not found: ' + err + ' '
                })
            }
            else {
                res.status(200);
                res.json(user);
            }
        }
    });
});
//Post User
router.post('/user', (req, res) => {
    var newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    res.set({
        'Accept': 'application/json',
        'X-Powered-By': 'Nodejs- Brian'
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.status(400);
            res.json({
                success: false,
                msg: 'Failed to add user: ' + err + ' '
            });
        }
        else {
            res.status(201);
            res.set('X-Powered-By', 'Nodejs- Brian');
            res.json({
                success: true,
                msg: 'user added successfully',
                user: user
            })
        }
    });

});
//Update User
router.put('/user/:id', (req, res) => {
    var userId = req.params.id;
    var updateUser = req.body;
    res.set({
        'Accept': 'application/json',
        'X-Powered-By': 'Nodejs- Brian'
    });
    User.updateUser(userId, updateUser, (err, user) => {
        if (err) {
            res.status(400);
            res.json({
                success: false,
                msg: 'Failed to update user: ' + err + ' '
            });
        }
        else {
            res.status(200);
            res.json({
                success: true,
                msg: 'Updated user successfully!',
                user: user
            });
        }
    });
});
//Delete User
router.delete('/user/:id', (req, res) => {
    var userId = req.params.id;
    res.set({
        'Accept': 'application/json',
        'X-Powered-By': 'Nodejs- Brian'
    });
    User.deleteUser(userId, (err, user) => {
        if (err) {
            res.status(400);
            res.json({
                success: false,
                msg: 'Failed to delete user! '
            });
        }
        else {
            res.status(200);
            res.json({
                success: true,
                msg: 'User was deleted successfully!'
            })
        }
    });
});
module.exports = router;
