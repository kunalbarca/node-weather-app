const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Utils are included
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name : 'Kunal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name : 'Kunal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name : 'Kunal'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'Please provide address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMsg: 'Help 404 page',
        title: 'Help 404',
        name : 'Kunal'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: '404 page',
        title: '404',
        name : 'Kunal'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})