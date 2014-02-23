define(["Container"], function(Container){
	var Page = Container.extend({
		blockClass: 'Page', 
		super: Container.prototype,
		superClass: 'Container',
		renderCSS: function(){}, 
		toJSON: function(){} //would be different because has to append metadata for the page
	}); 
	return Page; 
}); 