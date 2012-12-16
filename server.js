(function() {
  var app, express, port, _;

  express = require('express');

  _ = require('underscore');

  app = express();

  app.configure(function() {
    app.engine('.html', require('ejs').renderFile);
    app.set('views', __dirname + "/public/");
    app.set('view engine', 'ejs');
    app.set('view options', {
      layout: false,
      pretty: true
    });
    app.use(express["static"](__dirname + '/public'));
    app.use(express.bodyParser());
    return app.use(express.cookieParser());
  });

  app.get('/index.html#/', function(req, res, next) {
    return res.render('index');
  });

  port = process.env.PORT || 5000;

  app.listen(port);

  console.log("Express server listening on port %d in %s mode", port, app.settings.env);

}).call(this);
