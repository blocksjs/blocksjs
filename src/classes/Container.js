define(["Block"], function(Block){
	var Container = Block.extend({
		blockClass: 'Container', 
		super: Block.prototype, 
		superClass: 'Block',
		// subcollection:[],
/*		initialize: function(options){
			this.super.initialize.call(this, options); 
			this.subcollection = new Backbone.Collection(options.subcollection || []); 
		},
*/		create: function(json){}, 
		render: function(){
			_.each(this.subviews, function(subview){
				subview.render();
			});
		}, 
		/*renderBlock: function(){
		   	var view, block; 
	   		block = this; 
	   		view = false; 

	   		//return the view that matches that model 
	   		_.each(this.subviews, function(subview){ 
	   			(subview.model === model) ? view = subview : false; 
	   		}); 
	   		//create view if it doesn't already exist and append to this
	   		if(!view){ 
	   			this.createView( model, null, function( newView ){
	   				//add to el 
		   			block.$el.append(newView.render().el); 
		   			return newView; 
	   			}, block); 
	   		}else{ 
	   			//otherwise just have it render itself 
	   			var page = null; 
	   			if(!view.page){ 
	   				page = 	(view.parent && !view.parent.parent)? view.parent: 
	   						(block.page)? block.page: 
	   						block; 
	   			} 
	   			 
	   			view.page = page; 
	   			block.$el.append(view.render().el); 
		   		return view; 
	   		} 	
		
		}, */ //has to do this for each block in collection 
		toJSON: function(){
			var block = this;
			console.log('herrroooo');
			var output = block.super.toJSON.call(block);
			//console.log(block.subviews);
			if(block.subviews && block.subviews.length > 0){
				output.subcollection = [];
				for(var i in block.subviews){
					output.subcollection.push(block.subviews[i].toJSON());
				}
			}
			return output;
		}, //would be different because has to go through collection
		getClassList: function(){}, //get classes array from our collectin object 
		//These functions would be used in the Collection
		//This should be separated as a separate object 
		/*addToCollection: function(){}, 
		remove: function(view/number){},
		reset: function(){}, 
		blockType: 'defaultBlockType'
		*/
	}); 
	return Container; 
}); 