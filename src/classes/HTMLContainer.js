define(['Container', 'HTMLBlock'], function(Container, HTMLBlock){ 
	var HTMLContainer = HTMLBlock.extend(Container.prototype)
		.extend({ 
			blockClass: 'HTMLContainer', 
			superClass: 'Container', 
			super: Container.prototype, 
			defaultCSS: { 
				'display':'inline-block', 
				'width':'100%', 
				'height':'100%', 
				'transition':'all .5s', 
				'-webkit-transition':'all .5s', 
				'-moz-transition':'all .5s' 
			}, 
			template: 	_.template(''), 
			initialize: function(options){ 
				var container = this; 
				HTMLBlock.prototype.initialize.call(container, options); 
				Container.prototype.initialize.call(container, options); 

				//list to container events 
				container.listenTo(container.subcollection, 'add', this.addBlock); 
			}, 
			clear: function(){ 
				this.$el.clear(); 
				return this; 
			}, 
			addBlock: function(block){
				var container = this; 
				if(block.render)
					this.$el.append(block.render().el); 
				window.requestAnimationFrame(function(){
					//console.log(container);
					container.page.renderCSS(); 
				}); 
				/*setTimeout(function(){
					container.page.renderCSS(); 
				}, 0); */
				return this; 
			},
			renderBlock: function(model){ 
				var view, block = this;  
		   		 
		   		//if we find the subcollec
		   		if(bv = block.subcollection.findByModel(model)) view = bv;  
				if(view){ 
					//otherwise just have it render itself 
		   			view.render(); 
				}else{ 
					this.createView(model, 'HTMLBlock', {}, function( newView ){
		   				//add to el 
			   			block.$el.append(newView.render().el); 
			   			return newView; 
		   			}, block);
				}

		   		//create view if it doesn't already exist and append to this
		   		if(!this._verify(model)){ 
		   			this.createView(model, 'HTMLBlock', {}, function( newView ){
		   				//add to el 
			   			block.$el.append(newView.render().el); 
			   			return newView; 
		   			}, block); 
		   		}else{ 
		   			//otherwise just have it render itself 
		   			block.$el.append(view.render()); 
			   		return view; 
		   		} 	
			}
		});	
	return HTMLContainer; 
}); 