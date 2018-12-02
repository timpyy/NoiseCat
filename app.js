const port = 3000;
const db = require(('./db'));
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const Sound = mongoose.model('Sound');
const User = mongoose.model('User');
const routes = require('./index');
app.use(bodyParser.urlencoded({ extended: false }));
const staticPath = path.resolve(__dirname, 'public');
app.use(express.static(staticPath));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const passport = require('passport');
require('./db');
require('./auth');


const session = require('express-session');
const sessionOptions = {
	secret: 'secret cookie thang (store this elsewhere!)',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

app.use('/', routes);

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.listen(process.env.PORT || 3000);
