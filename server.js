(function() {
  var app, express, mongoDB, port, _, cp;
  cp = require('child_process');
  express = require('express');

  _ = require('underscore');

  mongoDB = require('./business/mongoDB');

  app = express();

  app.configure(function() {
    app.engine('.html', require('ejs').renderFile);
    app.set('views', __dirname + "/public/views");
    // app.set('view engine', 'ejs');
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
    return app.use(function(req, res, next) {
      if ((req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') > -1) || (req.headers['accept'] && req.headers['accept'].indexOf('application/json') > -1)) {
        return next();
      } else {
        return res.render('index.html');
      }
    });
  });

  app.get('/:action?', function(req, res, next) {
    console.log('test log', req.params.action);
    return res.json({
      "Name": "Ekta Mehta",
      "Email": "emehta@glgroup.com"
    });
  });

  process.env.type = app.settings.env;

  port = process.env.PORT || 5000;

  app.listen(port);

  console.log("Express server listening on port %d in %s mode", port, process.env.type);

}).call(this);
