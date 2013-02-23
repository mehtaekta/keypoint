var everyauth = require('everyauth'),
	config = require('../config');

  everyauth.google
  .myHostname('http://localhost:5000')
  .appId(config.google.clientId)
  .appSecret(config.google.clientSecret)
  .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/') // What you want access to
  .handleAuthCallbackError( function (req, res, next) {
  	console.log('handleAuthCallbackError');
  	res.render('401.html');
  })
  .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
    console.log('##################', sess);
    console.log('##################', accessToken);
    console.log('##################', extra);
    console.log('##################', googleUser);
    var promise = this.Promise(); 
        promise.fulfill('test'); 
        return promise;     
  })
  .redirectPath('/#/authenticated');