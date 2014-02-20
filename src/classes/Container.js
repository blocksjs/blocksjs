define(["Block"], function(Block){
	var Panel = Block.extend({
		blockType: 'Panel', 
		super: Block.prototype, 
		initialize: function(options){
			this.super.initialize.call(this, options); 
			this.subcollection = new Backbone.Collection(options.subcollection || []); 
		},
		create: function(json){}, 
		render: function(){}, 
		renderBlock: function(){},  //has to do this for each block in collection 
		toJSON: function(){} //would be different because has to go through collection
		getClassList: function(){}, //get classes array from our collectin object 
		//These functions would be used in the Collection
		//This should be separated as a separate object 
		/*addToCollection: function(){}, 
		remove: function(view/number){},
		reset: function(){}, 
		blockType: 'defaultBlockType'
		*/
	}); 
	return Block; 
}); 