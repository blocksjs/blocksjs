define(['backbone'], function(Backbone){ 
	var Block = Backbone.View.extend({ 
		blockClass: 'Block', 
		superClass: 'Backbone.View', 
		blockID: null, 
		defaults: {}, //this should be properties that 
		attributes: {}, //these are attributes that can be altered with get/set calls 
		initialize: function(options){ 
			var block = this; 

			//set block specific fields
			if(options && options._blockID) block._blockID = options._blockID; 
			if(options && options.blockID) block.blockID = options.blockID; 
			if(options && options.parent) this.parent = options.parent; 

			//extend whitelisted attributes from defaults with user options
			var attrs = _.omit(options,['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events', 'parent', 'blockClass']); 
			block.attributes = _.defaults({}, attrs, _.result(this, 'defaults')); 


			//start off events
			var channel = postal.channel(); 
			var subscription = channel.subscribe('pageRender', function(){
				console.log('MEEEEE', block); 
			}); 
			block.subscriptions = [subscription]; 

			//parent page 
			this.page = (function findPage(child){ 
				return 	(child.parent && child.parent.parent)? findPage(child.parent): 
						(child.parent !== blocks)? child.parent: 
						child; 
			})(this); 
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
		saveState: function(){
			var state, arr; 
			state = {}; 

			//set model and view 
			state.view = this.toJSON(); 
			state.model = this.model.toJSON(); 

			return state; 
		}, 
		toJSON: function(){ 
			var block = this, 
				ret = {}; 
				ret.view = {}, 
				targets = _.extend(block.defaults, {css:''}); 

			//get defaults for returning 
			_.each(targets, function(value, key){
				if(block.attributes.hasOwnProperty(key)) ret.view[key] = block.get(key); 
			}); 

			//add blockClass
			ret.view.blockClass = block.blockClass;
			if(block.blockID) ret.view.blockID = block.blockID;
			
			if(block.model) ret.model = block.model.toJSON();
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
		render: function(){
			return this; 
		} //this should actualize the state of the object, NOT deal with creating models
	}); 
	return Block; 
}); 