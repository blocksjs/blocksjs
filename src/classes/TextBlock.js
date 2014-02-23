define(["Block"], function(Block){
	var TextBlock = Block.extend({
		blockClass: 'TextBlock', 
		super: Block.prototype, 
		superClass: 'Block',
		attributes:{
			text: 'You should probably fill this with real text :)'
		}, //these are attributes that can be altered with get/set calls
		initialize: function(options){
			this.super.initialize.call(this, options); 
		},
	}); 
	return TextBlock; 
}); 