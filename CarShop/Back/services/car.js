var CarModel = require('../models/car')


var find = function(owner_id)
{
    return CarModel.find({owner:{$ne:owner_id}})
}

var findById = function(id)
{
    return CarModel.findById(id)
}

var findUserCars = function(owner_id)
{
    return CarModel.find({owner:owner_id})
}

var save = function(car,owner,path,images)
{
    return CarModel.saveCar(car,owner,path,images);
}

var deleteById = function(id)
{
    return CarModel.findByIdAndDelete(id).then(function(car){
        return true
    })
}

module.exports = {
    find,
    findById,
    findUserCars,
    save,
    deleteById
}