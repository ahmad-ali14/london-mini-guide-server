var express = require('express');
var cors = require('cors');
const scrap = require('./scrapFunction');


var app = express();

app.use(cors())

var city_error = require('./data/error.json');
app.get('/:city/pharmacies', async (req, res) => {
    var pharmacies = chooseFile(req.params.city).pharmacies;
    if(!pharmacies){ res.json(city_error) }
    res.json(pharmacies)
})


app.get('/:city/colleges', async (req, res) => {
    var colleges = chooseFile(req.params.city).colleges;
    if(!colleges){ res.json(city_error) }
    res.json(colleges)
})


app.get('/:city/hospitals', async (req, res) => {
    var hospitals = chooseFile(req.params.city).hospitals;
    if(!hospitals){ res.json(city_error) }
    res.json(hospitals)
})

app.get('/:city/doctors', async (req, res) => {
    var doctors = chooseFile(req.params.city).doctors
    if(!doctors){ res.json(city_error) }
    res.json(doctors)
})


const Port = 5000;

app.listen(Port, () => {
    console.log(`app listening on port ${Port}`);

})


// choose the file 
const chooseFile = (city) =>{
  switch(city){
    case 'Harrow' : return require('./data/Harrow.json'); break; 
  case 'heathrow' : return require('./data/Heathrow.json'); break; 
  case 'stratford' : return require('./data/Stratford.json'); break;
  default: return require('./data/error.json'); break;
  }
}