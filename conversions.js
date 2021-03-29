const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()

app.use(bodyParser.json())
app.use(cors())

const PORT = process.env.PORT || 5005

app.post('/conversions/ktoc', (req,res)=>{
    const {kelvinTemp} = req.body

    if (!kelvinTemp){
        return res.status(400).json('please enter a number of the object name of kelvinTemp')
    }
        let celsiusTemp = kelvinTemp - 273.1
        if (isNaN(celsiusTemp)){
            return res.status(400).json('please enter a proper number')
        }
        return res.send(`${kelvinTemp}°K is ${celsiusTemp.toFixed(2).toString()}°C`)
})

app.post('/conversions/ctok', (req,res)=>{
    const {celsiusTemp} = req.body

    if (!celsiusTemp){
        return res.status(400).json('please enter a number of the object name of celsiousTemp')
    }
        let kelvinTemp = celsiusTemp + 273.1
        if (isNaN(kelvinTemp)){
            return res.status(400).json('please enter a proper number')
        }
        return res.send(`${celsiousTemp}°C is ${kelvinTemp.toFixed(2).toString()}°K`)
})

app.post('/conversions/mtok', (req,res)=>{
    const {miles} = req.body

    if (!miles){
        return res.status(400).json('please enter a number of the object name of miles')
    }
        let kilos = miles * 1.60934
        if (isNaN(kilos)){
            return res.status(400).json('please enter a proper number')
        }
        return res.send(`${miles}miles is ${kilos.toFixed(2).toString()}Km`)
})

app.post('/conversions/ktom', (req,res)=>{
    const {kilos} = req.body

    if (!kilos){
        return res.status(400).json('please enter a number of the object name of kilos')
    }
        let miles = kilos / 1.60934
        if (isNaN(miles)){
            return res.status(400).json('please enter a proper number')
        }
        return res.send(`${kilos}Km is ${miles.toFixed(2).toString()}miles`)
})

app.listen(PORT , ()=>{
    console.log('app running on port 5005')
})