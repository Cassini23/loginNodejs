/**
 * Created by nina on 4/24/15.
 */
var mongoose = require('mongoose');

var SessionModel = mongoose.model('session',{

    timeStamp :{
        type: String,
        required: true,
        unique: true
    },
    cookie:{
        type: String,
        required: true,
        unique: true
    },
    userID:{
        type: String,
        required: true,
        unique: true
    }
});

module.exports = SessionModel;