const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    mobile_number:{type: String},
    city:{type:String},

    cars:[
        {type: mongoose.Schema.Types.ObjectId, ref:"user"}
    ],

    hash: { type: String},
    salt: {type: String }
})

UserSchema.methods.savePassword = function (password)
{
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000,64,"sha512").toString('hex')
}

UserSchema.methods.validatePassword = function (password)
{
    hash = crypto.pbkdf2Sync(password, this.salt, 1000,64,"sha512").toString('hex')
    return hash === this.hash;
}

UserSchema.methods.generateJwt = function()
{
    var expire = new Date();
    expire.setDate(expire.getDate()+7);

    return jwt.sign({
        _id: this._id,
        expire: parseInt(expire.getTime()/1000)
    }, "SECRET")
}


var UserModel = mongoose.model('user',UserSchema);


UserModel.register = async function(email, name,mobile_number,city,password)
{
    var user = new UserModel({
        email:email,
        name: name,
        mobile_number: mobile_number,
        city:city
    })

    user.savePassword(password)
    try
    {
        await user.save();
        return true
    }
    catch
    {
        return null;
    }
    
    
}

module.exports = UserModel