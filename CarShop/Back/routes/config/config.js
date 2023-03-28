var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var JwtStrategy = require('passport-jwt').Strategy
var JwtExtractor = require('passport-jwt').ExtractJwt
var UserModel = require('../../models/user')

var shortid = require('shortid');
var fs = require('fs')

let localOptions = {
    usernameField: "email"
}

passport.use(new LocalStrategy(localOptions, async function(email, password, done){
    var user = await UserModel.findOne({email:email});

    if (!user)
    {
        //greska
        done(null,null, {
            message: "Credentials not valid!"
        })
    }
    else
    {
        var validacija = user.validatePassword(password);
        if (!validacija)
        {
            //greska
            done(null,null, {
                message: "Credentials not valid!"
            })
        }
        else
        {
            //uspesno
            done(null, user)
        }
    }
}))


var jwtOptions = {
    secretOrKey: "SECRET",
    jwtFromRequest: JwtExtractor.fromAuthHeaderAsBearerToken()
}

passport.use(new JwtStrategy(jwtOptions, async function(jwt_payload, done){
    var user = await UserModel.findById(jwt_payload._id)
    console.log(user)
    if (!user)
    {
        done(null, null ,{
            message: "Credentials not valid!"
        })
    }
    else
    {
        done(null, user)
    }

}))


passport.createFolder = () => async (req,res,next) => {
    
    var ui= shortid()
    req.ui= ui
    await fs.promises.mkdir("images/"+req.user.email+"/"+ui, { recursive: true })

    next()
}


module.exports = passport