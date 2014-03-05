define(['backbone','Block'], function(Backbone, Block){ 
	var ViewBlock = Backbone.View.extend(Block);
	ViewBlock.extend({
		blockClass: 'ViewBlock',
		superClass: 'Block',
		super: Block.prototype, 
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
		render: function(){
			return this; 
		} //this should actualize the state of the object, NOT deal with creating models
	});
	return ViewBlock; 
}); 