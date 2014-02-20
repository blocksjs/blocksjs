define(["marionette.viewCollection"], function(viewCollection){
	var blockCollection = viewCollection.extend({
		renderCSS: function(){}, 
		toJSON: function(){} //would be different because has to append metadata for the page
		getClassList: function(){}, 
		findByBlockId: function(){}, 
		findByBlockClass: function(){}, 
		_classList: {}, //list of classes and an array of blockIds for each of those classes 
		_views: {}, //list of blocks by _blockId
		blockType: 'VideoBlock' // specify a block type for the collection
	}); 
	return Page; 
}); 