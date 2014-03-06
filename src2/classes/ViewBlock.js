define(['backbone','Block'], function(Backbone, Block){ 
	var ViewBlock = _.extend({}, Block.prototype, {
		blockClass: 'ViewBlock',
		superClass: 'Block',
		/*


			figure out super properly



		*/
		//super: Block.prototype, 
		initialize: function(options){ 
			var block = this; 
			Block.prototype.constructor.call(this, options); 
		}, 
		render: function(){
			return this; 
		}, //this should actualize the state of the object, NOT deal with creating models

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

	});
	return Backbone.View.extend(ViewBlock); 
}); 