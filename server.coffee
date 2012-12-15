express = require('express')
_ = require 'underscore'
# localStorage = require 'localStorage'
# everyAuth = require 'everyauth'
# connect = require 'connect'
# googleAuthen = require('./businesslayer/googleAuth')

# data = require('./businesslayer/stubData').data

# googleAuthen.authenticate()

app = module.exports = express.createServer()
app.configure( ->
	# singlePage = require './middleware/nexus_single_page'

	# # Register view engine
	# app.register('.html', require('ejs'));

	# # App Configuration
	# app.set 'views', __dirname + "/public/"
	# app.set 'view engine', 'ejs'
	# app.set 'view options', { layout: false, pretty: true }

	# # Middleware
	# app.use express.static(__dirname + '/public')
	app.use express.bodyParser()
	app.use(express.cookieParser())	# required by everyAuth
	# app.use(express.session({ secret: 'nexus'})) # required by everyAuth
	# app.use everyAuth.middleware()
	# app.use(singlePage({indexPage: 'views/index.html'}))
	
)

port = process.env.PORT or 5000
app.listen port
console.log("Express server listening on port %d in %s mode", port, app.settings.env)