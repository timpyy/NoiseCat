const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const Sound = mongoose.model('Sound');
const bodyParser = require("body-parser");

class userData {
  constructor(username, numOfEntries) {
    this.username = username;
    this.numOfEntries = numOfEntries;
  }
}

class userTags {
  constructor(username, tagsArr) {
    this.username = username;
    this.numOfTags = tagsArr.length;
  }
}

router.get('/', function(req, res) {
  if(req.user !== undefined) {
    res.render('index', { 'user': req.user.username});
  }
  else {
    res.render('index');
  }
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.post('/login', function(req,res,next) {
  // NOTE: use the custom version of authenticate so that we can
  // react to the authentication result... and so that we can
  // propagate an error back to the frontend without using flash
  // messages
  passport.authenticate('local', function(err,user) {
    if(user) {
      // NOTE: using this version of authenticate requires us to
      // call login manually
      req.logIn(user, function(err) {
        res.render('index', {'user':user.username});
      });
    } else {
      res.render('login', {message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
  // NOTE: notice that this form of authenticate returns a function that
  // we call immediately! See custom callback section of docs:
  // http://passportjs.org/guide/authenticate/
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  User.register(new User({username:req.body.username}),
      req.body.password, function(err, user){
    if (err) {
      // NOTE: error? send message back to registration...
      res.render('register',{message:'Your username or password is already taken'});
    } else {
      // NOTE: once you've registered, you should be logged in automatically
      // ...so call authenticate if there's no error
      passport.authenticate('local')(req, res, function() {
        res.render('index', {'user': req.user.username});
      });
    }
  });
});

router.get('/list', (req, res) => {
  Sound.find({"username": req.user.username}, function(err, result, count) {
    let allTags = [];
    for(let i = 0; i < result.length; i++) {
      for(let j = 0; j < result[i].tags.length; j++) {
        allTags.push(result[i].tags[j]);
      }
    }
    let myUserTags = new userTags(req.user.username, allTags);
    res.render('list', {'user': req.user.username, 'sounds': result, 'tagcount': myUserTags.numOfTags});
  })
});

router.get('/add', (req, res) => {
  res.render('add', {'user': req.user.username});
});

router.post('/add', (req, res) => {
  let tagArr = req.body.tags.split(" ");
  new Sound({
    'file_name' : req.body.file_name,
    'file_location' : req.body.file_location,
    'tags' : tagArr,
    'description' : req.body.description,
    'createdAt' : req.body.createdAt,
    'username' : req.user.username
  }).save(function(err, result, count){
    res.redirect('/');
  });
});

router.get('/find', (req, res) => {
  res.render('find', {'user': req.user.username});
})

router.post('/find', (req, res) => {
  let name = req.body.file_name;
  let location = req.body.file_location;
  let tagsArr2 = req.body.tags.split(" ");
  let description = req.body.description;
  let createdAt = req.body.createdAt;
  let response = "We couldn't find the file that you were looking for! Try refining your search.";
  if(name !== "") {
    Sound.find({'file_name': name, 'username': req.user.username}, function(err, result, count) {
      var isEmpty = (result || []).length === 0;
      if(isEmpty) {
        res.render('find', {'response': response, 'user': req.user.username});
      }
      else {
        res.render('entry', {'sounds': result, 'user': req.user.username});
      }
    })
  }
  else if(location !== "") {
    Sound.find({'file_location': location, 'username':req.user.username}, function(err, result, count) {
      var isEmpty = (result || []).length === 0;
      if(isEmpty) {
        res.render('find', {'response': response, 'user': req.user.username});
      }
      else {
        res.render('entry', {'sounds': result, 'user': req.user.username});
      }
    })
  }
  else if(tagsArr2[0] !== "") {
    Sound.find({'tags': tagsArr2, 'username':req.user.username}, function(err, result, count) {
      var isEmpty = (result || []).length === 0;
      if(isEmpty) {
        res.render('find', {'response': response, 'user': req.user.username});
      }
      else {
        res.render('entry', {'sounds': result, 'user': req.user.username});
      }
    })
  }
  else if(description !== "") {
    Sound.find({'description': description, 'username':req.user.username}, function(err, result, count) {
      var isEmpty = (result || []).length === 0;
      if(isEmpty) {
        res.render('find', {'response': response, 'user': req.user.username});
      }
      else {
        res.render('entry', {'sounds': result, 'user': req.user.username});
      }
    })
  }
  else if(createdAt !== "") {
    Sound.find({'createdAt': createdAt, 'username':req.user.username}, function(err, result, count) {
      var isEmpty = (result || []).length === 0;
      if(isEmpty) {
        res.render('find', {'response': response, 'user': req.user.username});
      }
      else {
        res.render('entry', {'sounds': result, 'user': req.user.username});
      }
    })
  }
});

router.get('/remove', (req, res) => {
  res.render('remove', {'user': req.user.username});
})

router.post('/remove', (req, res) => {
  let name = req.body.file_name;
  let location = req.body.file_location;
  let tagsArr2 = req.body.tags.split(" ");
  let description = req.body.description;
  let createdAt = req.body.createdAt;
  let errorResponse = "We couldn't find the file that you were looking for! Try refining your search.";
  let successResponse = "Successfully removed the following entry:";
  if(name !== "") {
    Sound.findOneAndDelete({'file_name': name, 'username': req.user.username}, function(err, result, count) {
      if(result !== null) {
        res.render('remove', {'message': successResponse, 'sounds': result, 'user': req.user.username});
      }
      else {
        res.render('remove', {'message': errorResponse, 'user': req.user.username});
      }
    })
  }
  else if(location !== "") {
    Sound.findOneAndDelete({'file_location': location, 'username': req.user.username}, function(err, result, count) {
      if(result !== null) {
        res.render('remove', {'message': successResponse, 'sounds': result, 'user': req.user.username});
      }
      else {
        res.render('remove', {'message': errorResponse, 'user': req.user.username});
      }
    })
  }
  else if(tagsArr2[0] !== "") {
    Sound.findOneAndDelete({'tags': tagsArr2, 'username': req.user.username}, function(err, result, count) {
      if(result !== null) {
        res.render('remove', {'message': successResponse, 'sounds': result, 'user': req.user.username});
      }
      else {
        res.render('remove', {'message': errorResponse, 'user': req.user.username});
      }
    })
  }
  else if(description !== "") {
    Sound.findOneAndDelete({'description': description, 'username': req.user.username}, function(err, result, count) {
      if(result !== null) {
        res.render('remove', {'message': successResponse, 'sounds': result, 'user': req.user.username});
      }
      else {
        res.render('remove', {'message': errorResponse, 'user': req.user.username});
      }
    })
  }
  else if(createdAt !== "") {
    Sound.findOneAndDelete({'createdAt': createdAt, 'username': req.user.username}, function(err, result, count) {
      if(result !== null) {
        res.render('remove', {'message': successResponse, 'sounds': result, 'user': req.user.username});
      }
      else {
        res.render('remove', {'message': errorResponse, 'user': req.user.username});
      }
    })
  }
});

router.get('/userinfo', function(req, res) {
  Sound.find({"username": req.user.username}, function(err, result, count) {
    let theUser = new userData(req.user.username, result.length);
    res.render('userinfo', {'user': theUser.username, 'username': theUser.username, 'entries': theUser.numOfEntries});
  })
});


module.exports = router;
