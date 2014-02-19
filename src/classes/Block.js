define([], function(){
	var Block = Backbone.View.extend({
		blockType: 'Block', 
		initialize: function(options){
			//_id, children, parents, page 
			//should be determined here 
		},
		get: function(){}, 
		set: function(){}, 
		options: function(){}, 
		remove: function(){}, 
		subscribe: function(){}, 
		unsubscribe: function(){}
	}); 
	return Block; 
}); 