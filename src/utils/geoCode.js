const request = require("postman-request")

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJoaXNoZWtzcml2YXN0YXZhZGV2IiwiYSI6ImNraThleHhzMzA1NGsycW81a2YxcG9pNDcifQ.HbA6OrkVhXTSoKYgzD8WWg&limit=1'
    request( {url, json : true}, (error, {body} = {})=>{
        if(error){
            callback('Unable to connect with Location Services', undefined)
        }else if(body.features.length === 0) {
            callback('Unable to find loacation, Please try another search', undefined)
        }else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }    
    })
}

module.exports  = geoCode