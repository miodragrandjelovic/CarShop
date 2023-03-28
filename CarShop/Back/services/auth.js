var UserModel = require("../models/user")

var register = function(email, name,mobile_number,city,password)
{
    return UserModel.register(email, name,mobile_number,city,password);
}

module.exports = {
    register
}