const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views template
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title : 'Weather App',
        name : 'Abhishek Srivastava'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title : 'About me',
        name : 'Abhishek Srivastava'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText : 'Help Page to help',
        title : 'Help',
        name : 'Abhishek Srivastava'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide address term'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404 Help',
        errorMessage : 'Help Aricle Not Found!!',
        name : 'Abhishek Srivastava'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMessage : 'Page Not Found!!',
        name : 'Abhishek Srivastava'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})