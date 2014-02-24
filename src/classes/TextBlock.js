define(["Block"], function(Block){
	var TextBlock = Block.extend({
		blockClass: 'TextBlock', 
		super: Block.prototype, 
		superClass: 'Block',
		attributes:{
			
		}, //these are attributes that can be altered with get/set calls
		initialize: function(options){
			console.log('         TEXT BLOCK TIME');
			console.log(this.attributes);
			this.super.initialize.call(this, options); 
			this.attributes = {
				text: 'You should probably fill this with real text :)'
			};
			console.log(this.attributes);
			console.log('        and done');
		},
	}); 
	return TextBlock; 
}); 