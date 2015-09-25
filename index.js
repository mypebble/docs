var config = require('./config');
var express = require("express");
var swig = require('swig');
var passport = require('passport');
var serveIndex = require('serve-index');

var app = express();

var session = require('express-session');
app.use(session({
  secret: 'pebblepebblepebblepebblepebble-sf',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Views
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Static
app.use('/public', express.static(__dirname + '/public'));
var authCheck = function(req, res, next){
  if(!req.user){
    return res.redirect('/');
  }
  next();
};
app.use('/docs', authCheck, express.static(__dirname + '/html'));
app.use('/docs', authCheck, express.static(__dirname + '/pages'));
app.use('/docs', authCheck, serveIndex(__dirname + '/html', {
  'icons': true
}));

// Homepage
app.get("/", function(req, res){
  res.render('login');
});

// Login
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    if(profile._json.domain == "talktopebble.co.uk"){
      return done(null, profile._json);
    } else{
      return done("You are not a member of Pebble", false);
    }
  }
));
app.get('/login',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/login/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/docs');
  });

// Boot up server
var port = process.argv[2] || process.env['PORT'] || config['port'] || 8080;
var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('http://%s:%s', host, port);
});
