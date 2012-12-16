# This will allow us to share logger across modules
util = require('util')
events = require('events')

# logger constructor
logger = ->
	# console.log 'in logger'
	events.EventEmitter.call(this)
	return

util.inherits(logger, events.EventEmitter)

logger.prototype.log = () ->
	this.emit( 'log', arguments )
	return

glgLogger = new logger()

#TODO log error to file
glgLogger.on "log", () ->
	args = arguments['0']
	console.log.apply(console, args);
	return

exports.glgLogger = glgLogger
