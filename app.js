const express = require('express')
const https=require("https")
const bodyParser=require("body-parser")
const request=require("request")

const app=express();

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")

})

app.post("/",function(req,res){

    const lang="pt"
    const city=req.body.cityName
    const appid="a24e005dc6a80e0e6f7686c6faf19606"
    const units="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+units+"&lang="+lang


    https.get(url,function(response){
        console.log(response.statusCode)

        response.on("data",function(data){
            const weatherData= JSON.parse(data)
            const temp=weatherData.main.temp
            const description=weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const urlIcon="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            
            res.write("<h1>A temperatura em "+city+" e de "+ temp + " Celsius</h1>")
            res.write("O tempo no momento e de "+description)
            res.write("<img src="+urlIcon+">")
            res.send()
        })
    })



})



app.listen(3000,function(){
    console.log("yeah baby")

})