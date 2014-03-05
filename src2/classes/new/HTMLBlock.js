define(['ViewBlock', 'CSS'], function(ViewBlock, CSS){ 
	var HTMLBlock = ViewBlock.extend({ 
		blockClass: 'HTMLBlock', 
		superClass: 'ViewBlock', 
		super: ViewBlock.prototype, 
		defaultCSS: { 
			'display':'inline-block', 
			'width':'100%', 
			'height':'100%', 
			'transition':'all .5s', 
			'-webkit-transition':'all .5s', 
			'-moz-transition':'all .5s' 
		}, 
		template: 	_.template('<p>ohheeeey from da <b>HTML</b> block</p>'), 
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
			var attrs = (this.attributes.hasOwnProperty('css'))? this.get('css'): {}; 
			this.css =  new CSS(attrs, {parent: block});
		},
		hide: function(){
			var view, deferred; 
			view = this; 

			if(view.$el.css('opacity') != 0){

				//on transition end set display to none
				view.$el.on('transitionEnd webkitTransitionEnd mozTransitionEnd', function handle(ev){
					if(ev.originalEvent.propertyName === 'opacity' && ev.originalEvent.target === view.el){
						view.$el.css({'display':'none'}); 
						view.css.set({'display':'none'}); 
						view.$el.off('transitionEnd webkitTransitionEnd mozTransitionEnd', handle); 
					}				
				}); 
				view.$el.css({'opacity':'0'}); 
				view.css.set({'opacity': 0}); 
			}else{
				view.$el.css({'display':'none'}); 
			}				

			//if the element has a youtube player stop it
			if(player = this.player){
				player.stopVideo(); 
			} 
			return this; 
		}, 
		show: function(){  
			var view, display; 
			view = this, 
			display = this.defaultCSS.display !== 'none'? this.defaultCSS.display : 'inline-block'; 
			this.$el.css({'display': display})
					.css({'opacity':'1'}); 
			this.css.set({'display': display, 
						  'opacity':'1'}); 
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
		render: function(){ 
			//if there is a model, merge it's properties with the defaults
			var dat = 
				(this.model)? 
					_.extend({}, this.toJSON(), this.model.toJSON()): 
					this.toJSON();

			this.$el.html(this.template(dat)); 
			return this; 
		}, 
	}); 
	return HTMLBlock; 
}); 