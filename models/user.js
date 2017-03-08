const mongoose = require('mongoose');
const config = require('../config/database');

//user schema
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', userSchema, 'Users');

module.exports.getAllUsers = function(callback) {
    const query = {};
    User.find(query, callback);
};

module.exports.getUserByFirstName = function(firstName, callback) {
    const query = {
        firstName: firstName.toLowerCase()
    }
    User.find(query, callback);
};

module.exports.addUser = function(newUser, callback) {
    newUser.save({
        new: true
    }, callback);
};

module.exports.deleteUser = function(id, callback) {
    const query = {
        _id: mongoose.Types.ObjectId(id)
    };

    User.findOneAndRemove(query, callback);
};

module.exports.updateUser = function(id, updatedUser, callback) {
    const query = {
        _id: mongoose.Types.ObjectId(id)
    };

    User.findOneAndUpdate(query, {
        $set: updatedUser
    }, {
        upsert: true,
        overwrite: true,
        new: true
    }, callback);
}