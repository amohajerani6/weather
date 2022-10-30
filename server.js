const express = require('express')
const bodyParser = require('body-parser')
const https = require('https');
const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))
app.get('/', function(req, res) {
  console.log('received a request')
  res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res) {
      var city = req.body.city
var url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=1c3db85cb078f95ca22abc0bcbff9eba'
console.log(url)
      https.get(url, function(resp) {

          resp.on('data', function(d) {
              var results = JSON.parse(d)
              var icon_url = 'http://openweathermap.org/img/wn/'+results.weather[0].icon+'@2x.png'
              console.log(icon_url)

              res.write('<h1>The current temperature in '+city+' is '+results.main.temp+'</h1>')
              res.write('<h1>It is '+results.weather[0].description+'</h1>')
              res.write('<img src='+icon_url+'>')
              res.send()

            })


          })
      })

    app.listen(3000, console.log('listening'))
