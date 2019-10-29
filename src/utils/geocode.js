const request=require("request")

const geocode =(address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaGFpZGVya2hhbjEyMyIsImEiOiJjazI3dTNqM3EweWg5M21reHExYmV2cDd3In0.JB_D6y-zP4Sa6kT7g2cxNA&limit=1'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('enable to connect to web services',undefined)
        }else if(Object.keys(body.features).length === 0){
            callback('unable to find location, try another search',undefined)
        }else{
            callback(undefined,{
                longtitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode;