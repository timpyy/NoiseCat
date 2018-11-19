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

app.get('/', (req, res) => {
  Sound.find({}, function(err, result, count) {
    res.render('index', {'sounds': result});
  })
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
    'description' : req.body.description
  }).save(function(err, result, count){
    res.redirect('/');
  });
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.listen(process.env.PORT || 3000);
