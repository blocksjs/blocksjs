define(['ViewBlock', 'CSS'], function(ViewBlock, CSS){ 
	var HTMLBlock = ViewBlock.extend({ 
		blockClass: 'HTMLBlock', 
		superClass: 'ViewBlock', 
		//super: ViewBlock.prototype, 
		defaultCSS: { 
			'display':'inline-block', 
			'width':'100%', 
			'height':'100%', 
			'transition':'all .5s', 
			'-webkit-transition':'all .5s', 
			'-moz-transition':'all .5s' 
		}, 
		skeleton: {
			view: {
				x: 'settings.x', 
				y: 'settings.y', 
				css: 'settings.css'
			} 
		}, 
		template: 	function(dat){ 
			return _.template('<p><b><% print("HTMLBlock") %></b></p>', dat, {variable: 'data'}); 
		}, 
		initialize: function(options){ 
			var block = this; 
			ViewBlock.prototype.initialize.call(this, options); 

			//add css classes based on block classes 
			this.el.classList.add(this.blockClass); 
			_.each(this.getClassAncestry(), function(className){ 
				block.el.classList.add(className); 
			}); 

			//set id onto the view 
			var myId = this._blockID; 
			if(options && options.blockID) myId = myId.concat(' ' + options.blockID); 
			this.id = this.el.id = myId; 

			//add css object
			var attrs = (this.hasOwnProperty('css'))? this.get('css'): {}; 
			this.css =  new CSS(attrs, {parent: block});
		},
		hide: function(){
			var view, deferred; 
			view = this; 

			if(view.$el.css('opacity') !== 0){
				var hideCSS = {
					'opacity':0, 
					'pointer-events':'none'
				}
				view.$el.css(hideCSS); 
				view.css.set(hideCSS); 
			}
			//if the element has a youtube player stop it
			if(player = this.player){
				player.stopVideo(); 
			} 
			return this; 
		}, 
		show: function(){  
			var view = this, 
				display = this.defaultCSS.display !== 'none'? this.defaultCSS.display : 'inline-block'; 
			
			var showCSS =  {
				display: display, 
				opacity:1, 
				'pointer-events':'auto'
			}

			view.$el.css(showCSS); 
			view.css.set(showCSS); 
			return this; 
		}, 
		inViewPort: function () {
		    var rect = this.el.getBoundingClientRect();

		    return (
		        rect.top >= 0 &&
		        rect.left >= 0 &&
		        rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
		        rect.right <= (window.innerWidth || document. documentElement.clientWidth)
		    );
		},
		remove: function(){ 
			Backbone.View.prototype.remove.call(this); 
			if(blocks) blocks._remove(this); 
			return this; 
		}, 
		render: function(){ 
			//if there is a model, merge it's properties with the defaults
			var dat = this.toJSON(); 
			var dummy = _.extend({}, dat.view, dat.model);  
			this.$el.html(this.template(dummy)); 
			return this; 
		}, 
	}); 
	return HTMLBlock; 
}); 