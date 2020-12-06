const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1761dcfb20ae1cf73ad1905b62631a7a&query='+ latitude + ',' + longitude + '&units=f'
    request({url, json : true}, (error, {body} = {}) =>{
            if(error){
                callback('Unable to connect with weather service',undefined)
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } 
            else{
                callback(undefined, body.current.temperature + ' in Farenhit ' + 'feels '+ body.current.weather_descriptions[0])
            }
    }) 
}

module.exports  = forecast