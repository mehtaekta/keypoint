express = require('express')
_ = require 'underscore'
mongoDB = require './business/mongoDB'

app = express()
app.configure( ->
	# # Register view engine
	app.engine('.html', require('ejs').renderFile);

	# # App Configuration
	app.set 'views', __dirname + "/public/views"
	app.set 'view engine', 'ejs'
	app.set 'view options', { layout: false, pretty: true }

	# # Middleware
	app.use express.static(__dirname + '/public')
	app.use express.bodyParser()
	app.use(express.cookieParser())	# required by everyAuth
	app.use(express.session({ secret: 'keypoint'})) # required by everyAuth
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
	# data = {FirstName:'Ekta', LastName: 'Mehta1', Email: 'mehta.ekta@gmail.com', Sex:'Female'}
	# mongoDB.add data, (err, success) ->
	# 	console.log '####################data',err, success
	# 	if( success)
	# 		criteria = {Sex: "Female"}
	# 		mongoDB.find criteria, (err, data) ->
	# 			console.log 'data',err, data
	res.json({"Name": "Ekta Mehta", "Email": "emehta@glgroup.com"})

process.env.type = app.settings.env
port = process.env.PORT or 5000
app.listen port
console.log("Express server listening on port %d in %s mode", port, process.env.type)