
//const express = rqeuire('express');
import express from 'express';
import Datastore from 'nedb';
import path from 'path'
import fetch from 'node-fetch'
import {fileURLToPath} from 'url';

//var parser = new DomParser();
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
console.log('directory-name', __dirname);

console.log(path.join(__dirname, '/dist', 'index.html'));

const app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
//app.use(express.json({limit: '1mb'}));


const router = express.Router();
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/views/index.html');
});

app.get('/public/views/index2.html', function(request, response) {
  response.sendFile(__dirname + '/public/views/index2.html');
});

app.get('/public/views/index.html', function(request, response) {
  response.sendFile(__dirname + '/public/views/index.html');
});
///RecommendationSite/HotgamesSite/index.html
app.get('/public/views/index3.html', function(request, response) {
  response.sendFile(__dirname + '/public/views/index3.html');
});



const database = new Datastore('database.db');
database.loadDatabase();
app.post('/api', (request, response)=> {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);

    console.log(data);
    response.json(data);
})



app.get('/top/:name_2',(request, respone) => {
  const name_2 = request.params.name_2;
  console.log(name_2)
  fetch('https://boardgamegeek.com/xmlapi2/user?name='+name_2+'&top=1', {
  method: 'GET',
}).then(res => res.text())
.then(json => {
    //console.log("HMMMMMMMM")
    //console.log(respone.json(json))
    respone.json(json)
});
});

app.get('/hot/:username',(request, respone) => {
  const username = request.params.username;
  fetch('https://boardgamegeek.com/xmlapi2/user?name='+username+'&hot=1', {
  method: 'GET',
}).then(res => res.text())
.then(json => {
    //console.log("HMMMMMMMM")
    //console.log(respone.json(json))
    respone.json(json)
});
});


app.get('/hotgames',(request, respone) => {
  fetch('https://boardgamegeek.com/xmlapi2/hot?type=boardgame', {
  method: 'GET',
  //body: xml.stringify(todo),
  //headers: { 'Content-Type': 'application/json' }
}).then(res => res.text())
.then(json => {
    respone.json(json)
});
});



app.get('/collection/:name',(request, respone) => {
  const name = request.params.name;
  console.log(name)
  fetch('https://boardgamegeek.com/xmlapi2/collection?username='+name, {
  method: 'GET',
}).then(res => res.text())
.then(json => {
    respone.json(json)
});
});


app.get('/ExpansionsAndImplementation/:id',(request, respone) => {
  //console.log(request)
  const id = request.params.id;
  console.log(id)

  fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`, {
  method: 'GET',
 
}).then(res => res.text())
.then(json => {
     
    respone.json(json)
});
});



