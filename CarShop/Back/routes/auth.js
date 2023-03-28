var authService = require('../services/auth')
var router = require('express').Router()

var passport = require('./config/config')

var fs = require('fs')

router.post('/register', async (req,res)=>{
    var flag = await authService.register
    (req.body.email, req.body.name,req.body.mobile_number,req.body.city, req.body.password);
    
    await fs.promises.mkdir("images/"+req.body.email, { recursive: true })

    if (!flag)
        res.status(503)
        
    res.send(flag)
})

router.post('/login', 
    passport.authenticate('local', {session: false}),
    (req,res)=>{
    
    res.send({
        "token":req.user.generateJwt()
    })
})


router.post('/validate', 
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
    res.status(200).send(true)
})

router.post('/getUser', 
    passport.authenticate('jwt', {session: false}),
    (req,res) => {
    res.status(200).send({name:req.user.name,
                          number:req.user.mobile_number})
})


module.exports = router;