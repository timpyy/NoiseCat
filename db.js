// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// is the environment variable, NODE_ENV, set to PRODUCTION?
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 console.log(conf);
 dbconf = conf.theString;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/hw05';
}

// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more sounds

//soundInfo contains information on a sound entry

const soundInfo = new mongoose.Schema({
  file_name: {type: String, required: true},
  file_location: {type: String, required: true},
  tags: {type: Array, required: false},
  description: {type: String, required: false},
  createdAt: {type: String, required: true},
  username: {type:String, required: true}
});

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
});

userSchema.plugin(passportLocalMongoose);

console.log(dbconf);

// TODO: add remainder of setup for slugs, connection, registering models, etc. below
mongoose.model('Sound', soundInfo);
mongoose.model('User', userSchema);
mongoose.connect(dbconf, {useNewUrlParser: true});
//mongoose.connect('mongodb://localhost/soundCat', { useNewUrlParser: true });
