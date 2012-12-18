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