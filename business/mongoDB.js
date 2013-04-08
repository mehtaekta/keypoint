(function() {
  var collections, databaseURL, db, mongojs;

  mongojs = require('mongojs');

  databaseURL = 'keypoint';

  collections = ["users", "movie"];

  db = mongojs.connect(databaseURL, collections);

  exports.find = function(criteria, callback) {
    db.users.find(criteria, function(err, users) {
      // if (err || users.length <= 0) {
      //   console.log("No users found");
      // } else {
      //   users.forEach(function(user) {
      //     console.log('user found', user);
      //   });
      // }
      return callback(err, users);
    });
  };

  exports.add = function(data, callback) {
    db.users.save(data, function(err, success) {
      // console.log('&&&&&&&&&&&&&&', success);
      // if (err || !success) {
      //   console.log("Unable to save data");
      // } else {
      //   console.log("Data saved successfully");
      // }
      return callback(err, data);
    });
  };

}).call(this);
