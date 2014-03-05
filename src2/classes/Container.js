define(["ViewBlock", "BlockCollection", "Create", "Query"], function(Block, BlockCollection, create, query ){ 
	var Container = Block.extend({ 
		blockClass: 'Container', 
		superClass: 'Block', 
		initialize: function(attributes){ 
			Block.prototype.initialize.call(this, attributes); 
			var attrs = attributes || {}; 
			this.subcollection = this.children = new BlockCollection(attrs.subcollection || []); 
		}, 
		createBlock: function(){
			create.createBlock.apply(this, arguments); 

		}, 
		createView: function(model, className, attributes, callback){ 
			var container = this; 
			blocks.getClass(className || 'Block', function(klass){ 
				var view = blocks._createView(model, klass, attributes); 
				blocks._set(view); //register it with blocks 
				container.subcollection.add(view); //add to the collection 
				if(_.isFunction(callback)) callback(view); 
			}); 					
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
	   		console.log('RET FROM _VERIFY IN CONTAINER', ret); 
	   		return ret; 
		}, 
		toJSON: function(){ 
			var container = this; 
			var output = Block.prototype.toJSON.call(this); 
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
	_.extend(Container.prototype, create, query); 
	return Container; 
}); 