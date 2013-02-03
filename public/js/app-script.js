(function($) {
	console.log('Sammy', Sammy);
    Sammy.JSON.LoadJSON = function(app) {
        app.helpers({
            loadJSON: function(location, options, callback) {
                options = $.extend(options, {json: true});
                return new Sammy.RenderContext(this).load(location, options, callback);
            }
        });
    }
})(jQuery);
(function($){
	var app = $.sammy("#main", function() {
		// this.element_selector= "#main"; // Alternate way to define element selector
		this.use(Sammy.JSON.LoadJSON);

		this.get('#/:action?', function(context) {
			var action = "/login";
			if(!_.isEmpty(this.params.action))
				action = this.params.action;
			var api = window.location.href;
			// context.log('ya ya ya', _.isUndefined(this.params.action), action);
			this.loadJSON(api)
				.then(function(items) {
	                // context.log(items, context.render('views/template/'+action+ '.html', items));
                	context.render('views/template/'+action+'.html', items)
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
