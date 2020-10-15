var mongoose = require('mongoose');

var addressList = new mongoose.Schema({
    addressline1 : {type: String, required: true},
    addressline2 : {type: String},
    city : {type: String, required: true},
    zipcode : {type: String, required: true},
    province : {type: String, required: true},
    country : {type: String, required: true}
});

var loginList = new mongoose.Schema({
    username : {type: String, required: true},
    password : {type: String, required: true}
});


var customerSchema = new mongoose.Schema({
    firstname : {type: String, required: true, minlength: 3},
    lastname : {type: String, minlength: 1},
    email : {type: String},
    phone : {type: String, maxlength: 12},
    address: [addressList],
    login: [loginList],
    createdate: {type:Date},
    modifieddate: {type:Date}
});

mongoose.model('Customer', customerSchema);

