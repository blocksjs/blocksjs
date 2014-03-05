define(['Block'], function(Block, CSS){ 
	var ViewBlock = _.extend({}, Block.prototype, { 
		blockClass: 'ViewBlock', 
		superClass: 'Block', 
		super: Block.prototype, 
		initialize: function(options){ 
			var block = this; 
			Block.prototype.constructor.call(this, options); 

			//set skeleton 
			this.createSkeleton(options); 

			//set id onto the view 
			var myId = this._blockID; 
			if(options && options.blockID) myId = myId.concat(' ' + options.blockID); 
			this.id = this.el.id = myId; 
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
	}); 
	HTMLBlock = Backbone.View.extend(HTMLBlock); 
	return HTMLBlock; 
}); 