express = require('express')
_ = require 'underscore'
# localStorage = require 'localStorage'
# everyAuth = require 'everyauth'
# connect = require 'connect'
# googleAuthen = require('./businesslayer/googleAuth')

# data = require('./businesslayer/stubData').data

# googleAuthen.authenticate()

app = express()
app.configure( ->
	# singlePage = require './middleware/nexus_single_page'
	console.log 'config test log'
	# # Register view engine
	app.engine('.html', require('ejs').renderFile);

	# # App Configuration
	app.set 'views', __dirname + "/public/template"
	app.set 'view engine', 'ejs'
	app.set 'view options', { layout: false, pretty: true }

	# # Middleware
	app.use express.static(__dirname + '/public')
	app.use express.bodyParser()
	app.use(express.cookieParser())	# required by everyAuth
	# app.use(express.session({ secret: 'nexus'})) # required by everyAuth
	# app.use everyAuth.middleware()
	# app.use app.router
	app.use((req, res, next) ->
		if (req.headers['content-type'] and req.headers['content-type'].indexOf('application/json') > -1) or (req.headers['accept'] and req.headers['accept'].indexOf('application/json') > -1)
			next()
		else
			res.render('index.html')
	)

)

app.get '/:action?', (req, res, next) ->
	console.log('test log', req.params.action)
	res.json({"Name": "Ekta Mehta", "Email": "emehta@glgroup.com"})

port = process.env.PORT or 5000
app.listen port
console.log("Express server listening on port %d in %s mode", port, app.settings.env)