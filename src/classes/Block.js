define(['backbone'], function(Backbone){ 
	var Block = Backbone.View.extend({ 
		blockClass: 'Block', 
		superClass: 'Backbone.View', 
		blockID: null, 
		defaults: {}, //this should be properties that
		attributes: {}, //these are attributes that can be altered with get/set calls
		initialize: function(options){
			if(this.blockClass == 'TextBlock'){
				console.log('INIT');
				console.log(options);
			}
			var block = this;
			var attrs = _.omit(options,['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events', 'parent', 'blockClass']); 
			block.attributes = _.defaults({}, attrs, _.result(this, 'defaults'));
			if(this.blockClass == 'TextBlock'){
				console.log(block.attributes);
				console.log('JUST FINISHED');
			}	//_id, children, parents, page, super?, model, attributes
			//should be determined here 
		},
		get: function(key){
			var block = this;
			if(!key){ //if no parameters passed in
				return block.attributes;
			} else if(!block.attributes.hasOwnProperty(key)){ //if property doesn't exist
				return void 0;
			} else{
				return block.attributes[key]; //otherwise return property value
			}
		}, 
		set: function(key, value){
			var block = this;
			if(!key){
				return void 0;
			} else if(!block.attributes.hasOwnProperty(key)){ //if property doesn't exist
				return void 0;
			} else if(value === void 0){
				return false;
			} else{
				block.attributes[key] = value;
				return block;
			} 
		}, 
		getID: function(){
			return this.blockID;
		},
		setID: function(newID){
			var block = this;
			if(newID === void 0)
				return false;
			else if(typeof newID !== "string" && newID !== null)
				return false;
			else {
				block.blockID = newID;
				return block;
			}

		},
		remove: function(){
			Backbone.View.prototype.remove.call(this); 
			blocks._remove(this); 
			return this; 
		}, 
		subscribe: function(){}, 
		unsubscribe: function(){}, 
		toJSON: function(){
			var block = this,
				ret = {}; 
				ret.view = {};
			//go through options from prototype 
			//but set values from this object for export
			//we only export the required values and not 
			//extra things determined at runtime (those would be based on initial options)
/*			_.each(this.prototype.options, function(value, key){
				if(block.has(key)) ret[key] = block.get(key); 
			})
*/			
			ret.view.blockClass = block.blockClass;
			if(!_.isEmpty(block.attributes)){
				ret.view.attributes = block.attributes;
			}
			if(block.blockID)
				ret.view.blockID = block.blockID;
			if(block.model && block.model.attributes && !_.isEmpty(block.model.attributes))
				ret.model = block.model.attributes;
			return ret; 
		}, 
		getClassAncestry: function(){
			var block = this;
			if(block.blockClass === 'Block')
				return [];
			else{
				var ancestry = [block.superClass];
				if(block.superClass !== 'Block'){
					ancestry = ancestry.concat(block.super.getClassAncestry());
				}
				return ancestry;
			}
		},
		render: function(){} //this should actualize the state of the object, NOT deal with creating models
	}); 
	return Block; 
}); 