(function($){
	// console.log('message');
	var app = $.sammy("#main", function() {
		// this.element_selector= "#main"; // Alternate way to define element selector

		this.get('#/', function(context) {
			context.log('ya ya ya');
			this.load('/logon')
				.then(function(items) {
					 context.render('templates/index', items)
					 	.appendTo(context.$element());
			});
				
        });

	});

	$(function(){
		console.log('DOM Ready!!!!!!!!!!!');
		// Start sammy app and pass it a ‘start_url’ 
		// which is the route we want it to load if no other route was specified
		app.run('#/');
	});
	
})(jQuery);
