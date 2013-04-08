var everyauth = require('everyauth'),
	config = require('../config'),
  mongoDB = require('./mongoDB');

  everyauth.google
  .myHostname('http://localhost:5000')
  .appId(config.google.clientId)
  .appSecret(config.google.clientSecret)
  .scope('https://www.googleapis.com/auth/userinfo.profile https://www.google.com/m8/feeds/') // What you want access to
  .handleAuthCallbackError( function (req, res, next) {
  	console.log('handleAuthCallbackError');
  	res.render('401.html');
  })
  .findOrCreateUser( function (sess, accessToken, extra, googleUser, req) {
    // console.log('################## sess', sess);
    // console.log('################## accessToken', accessToken);
    // console.log('################## extra', extra);
    // console.log('################## googleUser', googleUser, googleUser.id);
    // sess.secret = 'keypoint';
    var promise = this.Promise(); 
    mongoDB.find({'id': googleUser.id}, function(err, user){
      // console.log('find err', err);
      // console.log('find user', user[0]);
      if(err) return promise.fail(err);
      if(user) {
        // req.user = user[0];
        return promise.fulfill(user[0]);
      }

      mongoDB.add(googleUser, function(err, createdUser){
        // console.log('add err', err);
        // console.log('add user', createdUser);
        if(err) return promise.fail(err);
        if(createdUser) {
          // req.user = createdUser;
          return promise.fulfill(createdUser);              
        }
      });
    });  
    // console.log('return test promise');
    promise.fulfill('test');
    return promise; 
  })
  .redirectPath('/#/authenticated');