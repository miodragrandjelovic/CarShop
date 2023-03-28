var carService = require('../services/car')
var router = require('express').Router()

var passport = require('./config/config')
var upload = require('./config/multer')

var fs = require('fs')
const path = require( "path" );
var functions = require("./config/functions")

const config = require("../config")

//radi sve na doleee

router.get('/myCars',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {

        var cars = await carService.findUserCars(req.user._id)

        res.send(cars)
})





router.get('/',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        var cars = await carService.find(req.user._id)

        res.send(cars)

        
})

router.get('/:id',   
    async (req, res) => {
        var car = await carService.findById(req.params.id)

        res.send(car)
        
})

router.post('/',   
    passport.authenticate('jwt', {session: false}),
    passport.createFolder(),
    upload.array("images",8),
    (req, res) => { 

        const url = req.protocol + '://localhost:'+config.port;  
        const pathh=url+"/"+req.user.email+"/"+req.ui
        var images=[]

        req.files.forEach(element => {

            images.push(element.filename) 
        });

        var car = carService.save(req.body,req.user,pathh,images)
        res.send(true)
})


router.delete('/:id',
    async (req,res)=>{

        var success = await carService.deleteById(req.params.id)
        if (success)
            res.send(success);
        else
            res.status(404).send();


})


module.exports=router