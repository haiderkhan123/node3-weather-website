const request=require('request');
const forecast=(latitude,longtitude,callback)=>{
    const url='https://api.darksky.net/forecast/21dbc05abede0da85c335465f190eb87/'+latitude+','+longtitude
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('unable to find web services',undefined)
        }else if(body.error){
            callback('unable to find location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+". Today low temperature will be "+body.daily.data[0].temperatureLow+" degrees and high temperature will be "+body.daily.data[0].temperatureHigh+" degrees. it is currently "+body.currently.temperature+" degrees out. there is a "+body.currently.precipProbability+" chance of the rain.")
        }
    })
}

module.exports=forecast