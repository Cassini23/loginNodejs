/**
 * Created by nina on 4/24/15.
 */
var mongoose = require('mongoose');


/*Regular expression for email*/
function regexEmail(value){
    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(value);
};

/*Regular expression for password*/
function regexPassword(value){
    return /^(?=.*\d)(?=.*[a-zA-Z]).{4,8}$/i.test(value);
};


var message ='Password must have atleast one number and one character and the  length must be between 4 to 8 characters';

var AuthenticateModel = mongoose.model('authenticate',{
    email:{
        type: String,
        required: true,
        unique: true,
        validate :[regexEmail,'improper email id']
    },
    password:{
        type: String,
        required: true,
        unique: true,
        validate: [regexPassword, message]
    }
});

module.exports = AuthenticateModel;