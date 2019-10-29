const path= require("path")
const express = require("express")
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
// define the paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'Haider Khan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Haider Khan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'this a help page',
        name:'Haider Khan'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you must provide an address"
        })
    }
    const addres=req.query.address
    geocode(addres,(error,{latitude,longtitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longtitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Help articale not found',
        name:'Haider khan'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'My 404 page',
        name:'Haider khan'
    })
})

app.listen(3000,()=>{
    console.log('server is running')
})