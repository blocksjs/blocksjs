define(["Panel"], function(Panel){
	var Page = Panel.extend({
		blockType: 'Page', 
		renderCSS: function(){}, 
		toJSON: function(){} //would be different because has to append metadata for the page
	}); 
	return Page; 
}); 