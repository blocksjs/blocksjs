define(["ViewBlock", "BlockCollection", "create", "query"], function(ViewBlock, BlockCollection, create, query ){ 
	var Container = ViewBlock.extend({ 
		blockClass: 'Container', 
		superClass: 'ViewBlock', 
		super: ViewBlock.prototype, 
		initialize: function(attributes){ 
			ViewBlock.prototype.initialize.call(this, attributes); 
			var attrs = attributes || {}; 
			this.subcollection = this.children = new BlockCollection(attrs.subcollection || []); 
		}, 
		render: function(){ 	
			var container = this; 
			//render data from the blocks 
			if( this.model.subcollection ){ 
				//this.model.subcollection.each(this.renderBlock, this); 
				_.each(this.model.subcollection.models, function(model){
					container.renderBlock(model); 
				}); 
			} 
		    return this; 
	   	}, 	
	   	//has to do this for each block in collection 
		//renderBlock: function(model){}, 
		_verify: function(model){ 
			var ret = false; 
			//return the view that matches that model 
	   		_.each(this.subviews, function(subview){ 
	   			(subview.model === model) ? ret = subview : false; 
	   		}); 
	   		return ret; 
		}, 
		toJSON: function(){ 
			var container = this; 
			var output = ViewBlock.prototype.toJSON.call(this); 
			//console.log(block.subviews); 
			if(container.subcollection && container.subcollection.length > 0){ 
				output.subcollection = []; 
				container.subcollection.each(function(block){ 
					output.subcollection.push(block.toJSON()); 
				}); 
			} 
			return output; 
		}
	}); 

/*


create unit test that makes sure container is actually extended

or just console.log tests

*/
	_.extend(Container.prototype, create, query); 
	return Container; 
}); 