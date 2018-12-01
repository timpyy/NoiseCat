const port = 3000;
const db = require(('./db'));
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const Sound = mongoose.model('Sound');
app.use(bodyParser.urlencoded({ extended: false }));
const staticPath = path.resolve(__dirname, 'public');
app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
/*
const http = require('http');
const https = require('https');
const fs = require('fs');
const options = {
	key: fs.readFileSync(__dirname + '/ssl/server.pem'),
	cert: fs.readFileSync(__dirname + '/ssl/server.crt'),
};
https.createServer(options, app).listen(app.get('port'), function(){
	console.log('Express started ...');
});
*/

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/list', (req, res) => {
  Sound.find({}, function(err, result, count) {
    res.render('list', {'sounds': result});
  })
});

app.get('/find', (req, res) => {
  res.render('find');
})

app.post('/find', (req, res) => {
  let name = req.body.file_name;
  let location = req.body.file_location;
  let tagsArr2 = req.body.tags.split(" ");
  let description = req.body.description;
  let createdAt = req.body.createdAt;
  let response = "We couldn't find the file that you were looking for! Try refining your search.";
  if(name !== "") {
    Sound.find({'file_name': name}, function(err, result, count) {
      if(count === undefined) {
        res.render('find', {'response': response});
      }
      else {
        res.render('entry', {'sounds': result});
      }
    })
  }
  else if(location !== "") {
    Sound.find({'file_location': location}, function(err, result, count) {
      if(count === undefined) {
        res.render('find', {'response': response});
      }
      else {
        res.render('entry', {'sounds': result});
      }
    })
  }
  else if(tagsArr2[0] !== "") {
    Sound.find({'tags': tagsArr2}, function(err, result, count) {
      if(count !== undefined) {
        res.render('find', {'response': response});
      }
      else {
        res.render('entry', {'sounds': result});
      }
    })
  }
  else if(description !== "") {
    Sound.find({'description': description}, function(err, result, count) {
      if(count !== undefined) {
        res.render('find', {'response': response});
      }
      else {
        res.render('entry', {'sounds': result});
      }
    })
  }
  else if(createdAt !== "") {
    Sound.find({'createdAt': createdAt}, function(err, result, count) {
      if(count !== undefined) {
        res.render('find', {'response': response});
      }
      else {
        res.render('entry', {'sounds': result});
      }
    })
  }
});


app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  let tagArr = req.body.tags.split(" ");
  new Sound({
    'file_name' : req.body.file_name,
    'file_location' : req.body.file_location,
    'tags' : tagArr,
    'description' : req.body.description,
    'createdAt' : req.body.createdAt
  }).save(function(err, result, count){
    res.redirect('/');
  });
});

app.get('/remove', (req, res) => {
  res.render('remove');
})

app.post('/remove', (req, res) => {
  let name = req.body.file_name;
  let location = req.body.file_location;
  let tagsArr2 = req.body.tags.split(" ");
  let description = req.body.description;
  let createdAt = req.body.createdAt;
  let errorResponse = "We couldn't find the file that you were looking for! Try refining your search.";
  let successResponse = "Successfully removed the following entry:";
  if(name !== "") {
    Sound.findOneAndRemove({'file_name': name}, function(err, result, count) {
      //console.log("name: " + name);
      if(result !== null) {
        res.render('remove', {'message': successResponse, 'sounds': result});
      }
      else {
        res.render('remove', {'message': errorResponse});
      }
    })
  }
  else if(location !== "") {
    Sound.findOneAndRemove({'file_location': location}, function(err, result, count) {
      //console.log("location: " + location);
      if(result !== null) {
        res.render('remove', {'message': successResponse, 'sounds': result});
      }
      else {
        res.render('remove', {'message': errorResponse});
      }
    })
  }
  else if(tagsArr2[0] !== "") {
    Sound.findOneAndRemove({'tags': tagsArr2}, function(err, result, count) {
      //console.log("tags: " + tagsArr2[0] + ", " + tagsArr2.length + ", " + count);
      if(result !== null) {
        res.render('remove', {'message': successResponse, 'sounds': result});
      }
      else {
        res.render('remove', {'message': errorResponse});
      }
    })
  }
  else if(description !== "") {
    Sound.findOneAndRemove({'description': description}, function(err, result, count) {
      console.log("desc: " + description);
      if(result !== null) {
        res.render('remove', {'message': successResponse, 'sounds': result});
      }
      else {
        res.render('remove', {'message': errorResponse});
      }
    })
  }
  else if(createdAt !== "") {
    Sound.findOneAndRemove({'createdAt': createdAt}, function(err, result, count) {
      console.log("create: " + createdAt);
      if(result !== null) {
        res.render('remove', {'message': successResponse, 'sounds': result});
      }
      else {
        res.render('remove', {'message': errorResponse});
      }
    })
  }
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.listen(process.env.PORT || 3000);
