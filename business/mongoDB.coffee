mongojs = require('mongojs')
databaseURL = 'keypoint'
collections = ["users", "movie"]
db = mongojs.connect(databaseURL, collections)

exports.find = (criteria, callback) ->
# {sex: "female"}
	db.users.find criteria, (err, users) ->
		if( err || users.length <= 0) 
			console.log("No female users found")
		else 
			users.forEach (femaleUser) ->
				console.log(femaleUser);
		callback err, users

exports.add = (data, callback) ->
# {sex: "female"}
	db.users.save data, (err, success) ->
		console.log '&&&&&&&&&&&&&&', success
		if( err || !success) 
			console.log "Unable to save data"
		else 
			console.log "Data saved successfully"
		callback err, success