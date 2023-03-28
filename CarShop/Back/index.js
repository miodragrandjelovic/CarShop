const express = require('express')
const app = express()
const config = require('./config')
const cors = require('cors')

const bodyParser= require('body-parser')


var mongoose = require('mongoose')
mongoose.connect(config.dbConnection)
const authRoutes = require('./routes/auth')
const carRoutes = require('./routes/car')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()) 
app.use(cors())

//app.use(express.json())
app.use(express.static('images'))
app.use("/auth",authRoutes)
app.use("/car",carRoutes)


app.get('/', (req, res) => {
    res.send('Hello World from GETT!')
})

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})