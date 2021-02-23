const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=13e0a8df10b628f7718f2b79fda183b9&query='+ latitude + ',' + longitude +'&units=m'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Network Error!', undefined)
        }else if(body.error){
            callback('Invalid location', undefined)
        }else{
            callback(undefined, (
                body.current.weather_descriptions[0]
                + '. It is currently '
                + body.current.temperature
                + ' degrees out. It feels like '
                + body.current.feelslike
                + ' degrees out.'
            ))
        }
    })
}

module.exports = forecast