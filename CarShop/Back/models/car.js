const mongoose = require('mongoose')

var CarSchema = mongoose.Schema({
    mark: {type: String},
    model: {type: String},
    typeOfVehicle: {type:String},
    yearsOld:{type:Number},
    km:{type:Number},
    fuel: {type: String},
    cubicasis: {type:Number},
    drive: {type:Number}, //pogon 0- prednji 1- zadnji 2- sva cetiri
    gearbox: {type:Number}, //menjac 0-manuelni 1-automatik
    numberOfDoors:{type:Number},
    numberOfSeets:{type:Number},
    price:{type:Number},
    pathImages:{type:String},
    images:[{type:String}],


    owner: { type: mongoose.Schema.Types.ObjectId, ref:"user"}
})


var CarModel = mongoose.model('car', CarSchema)


CarModel.saveCar = function(car,owner,path,images){

    var newCar = new CarModel({

        mark: car.mark,
        model: car.model,
        typeOfVehicle: car.typeOfVehicle,
        yearsOld: Number(car.yearsOld),
        km: Number(car.km),
        fuel: car.fuel,
        cubicasis: Number(car.cubicasis),
        drive: Number(car.drive),
        gearbox: Number(car.gearbox),
        numberOfDoors: Number(car.numberOfDoors),
        numberOfSeets: Number(car.numberOfSeets),
        price:Number(car.price),
        //pathImages:[images],
        //pathImages:"images/"+owner.email+"/"+ui,
        pathImages:path,
        images:images,
        owner:owner._id
    })

    newCar.save()

    return newCar

}

module.exports=CarModel