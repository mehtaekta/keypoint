(function($){
	var app = $.sammy("#main", function() {
		// this.element_selector= "#main"; // Alternate way to define element selector
		this.use(Sammy.JSON.LoadJSON);

		this.get('#/:action?', function(context) {
			var action = "login";
			console.log('this.params.action', this.params.action, this.params.action.toString() != 'signout');
			if(!_.isEmpty(this.params.action)) {
				action = this.params.action;				
			}
			var api = window.location.href;
			context.log('action', action);
			this.loadJSON('/'+ action)
				.then(function(items) {
	                context.log('view', items);
                	context.render('views/'+items.view+'.html', items)
				  		.appendTo(context.$element());
				});
			context.app.swap('');
        });

	});

	$(function(){
		// Start sammy app and pass it a ‘start_url’ 
		// which is the route we want it to load if no other route was specified
		app.run('#/');
	});
	
})(jQuery);
