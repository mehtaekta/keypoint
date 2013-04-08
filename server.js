(function() {
  var app, express, mongoDB, port, _, cp, everyauth, googleAuthenticate, authenticateRequest;
  cp = require('child_process');
  express = require('express');
  everyauth = require('everyauth')
  googleAuthenticate = require('./business/googleAuthenticate');
  _ = require('underscore');
  mongoDB = require('./business/mongoDB');
  errorHandler = require('./middleware/errorHandler');
  authenticateRequest = require('./middleware/authenticateRequest');

  app = express();  

  app.configure(function() {
    app.engine('.html', require('ejs').renderFile);
    app.set('views', __dirname + "/public/views");
    app.set('view engine', 'ejs');
    app.set('view options', {
      layout: false,
      pretty: true
    });
    app.use(express["static"](__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
      secret: 'keypoint'
    }));
    app.use(everyauth.middleware());
    app.use(function(req, res, next) {
      if ((req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') > -1) || (req.headers['accept'] && req.headers['accept'].indexOf('application/json') > -1)) {
        console.log('debug message req header');
        return next();
      } else {
        return res.render('index.html');
      }
    });
    app.use(authenticateRequest());
    app.use(app.router);
    app.use(errorHandler({ dumpExceptions: true }));    
  });

  app.get('/authenticated', function(req, res, next) {
    req.session.authorized = true;    
    res.json({view:'home', payload :''});    
  });

  app.get('/signout', function(req, res, next) {
    if (req.session.authorized) {
        console.log('logout now');
        console.log('signedout action user', req.user);
        // this destroys the current session (not really necessary because you get a new one
        req.session.destroy(function() {
            delete req.session.user;  // remove credentials
            req.session.authenticated = false; 
            res.clearCookie('connect.sid', { path: '/' }); 
        });
    }
    res.json({view:'login', payload :''});
  });

  app.get('/:action?', function(req, res, next) {
    action = req.params.action;
    // console.log('test log', req.params.action);
    console.log('action action user',action, req.user);
    res.json({
      view: action,
      "Name": "Ekta Mehta",
      "Email": "emehta@glgroup.com"
    });
  });


  process.env.type = app.settings.env;

  port = process.env.PORT || 5000;

  app.listen(port);

  console.log("Express server listening on port %d in %s mode", port, process.env.type);

}).call(this);
