define(['backbone'], function(Backbone){
	var Block = Backbone.View.extend({
		blockType: 'Block', 
		superClass: 'Backbone.View', 
		defaults: {}, //this should be properties that
		initialize: function(options){
			//_id, children, parents, page, super?, model, attributes
			//should be determined here 
		},
		get: function(){}, 
		set: function(){}, 
		remove: function(){}, 
		subscribe: function(){}, 
		unsubscribe: function(){}, 
		toJSON: function(){
			//go through options from prototype 
			//but set values from this object for export
			//we only export the required values and not 
			//extra things determined at runtime (those would be based on initial options)
			var block = this,
				ret = {}; 
			_.each(this.prototype.options, function(value, key){
				if(block.has(key)) ret[key] = block.get(key); 
			})
			return ret; 
		}, 
		render: function(){} //this should actualize the state of the object, NOT deal with creating models
	}); 
	return Block; 
}); 