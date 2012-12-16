(function() {
  var events, glgLogger, logger, util;

  util = require('util');

  events = require('events');

  logger = function() {
    events.EventEmitter.call(this);
  };

  util.inherits(logger, events.EventEmitter);

  logger.prototype.log = function() {
    this.emit('log', arguments);
  };

  glgLogger = new logger();

  glgLogger.on("log", function() {
    var args;
    args = arguments['0'];
    console.log.apply(console, args);
  });

  exports.glgLogger = glgLogger;

}).call(this);
