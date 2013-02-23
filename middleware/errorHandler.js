exports = module.exports = function errorHandler(options){
	options = options || {};
	var dumpExceptions = options.dumpExceptions;
	
	return function errorHandler(err, req, res, next){
		console.log('err.status', res.statusCode);
		next();
		// if(dumpExceptions) console.error('CMP Error', err);

		// if(res.statusCode === 401)
		// {
		// 	console.log('errorHandler', '401 error');
		// 	res.render('401.html');

		// } else {
		// 	console.log('errorHandler', '501 error');
		// 	res.statusCode = 501;		
		// 	//res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
	 //      	// res.end(err.stack);
	 //      	res.json({},res.statusCode)
		// }
		 
    	
	};
};