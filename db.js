// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

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
  createdAt: {type: Date, required: true}
});


// TODO: add remainder of setup for slugs, connection, registering models, etc. below
