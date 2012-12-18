(function($){
	// console.log('message');
	var app = $.sammy("#main", function() {
		// this.element_selector= "#main"; // Alternate way to define element selector
		this.use(Sammy.JSON.LoadJSON);

		this.get('#/', function(context) {
			context.log('ya ya ya', context);
			this.loadJSON('http://localhost:5100/#/logon')
				.then(function(items) {
	                context.log(items, context.render('template/login.html', items));
                	context.render('template/login.html', items)
				  		.appendTo(context.$element());
				});
			context.app.swap('');
        });

	});

	$(function(){
		console.log('DOM Ready!!!!!!!!!!!');
		// Start sammy app and pass it a ‘start_url’ 
		// which is the route we want it to load if no other route was specified
		app.run('#/');
	});
	
})(jQuery);
