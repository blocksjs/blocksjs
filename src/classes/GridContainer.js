define(['HTMLContainer'], function(HTMLContainer){ 
	var GridContainer = HTMLContainer.extend({ 
		blockClass: 'GridContainer', 
		superClass: 'HTMLContainer', 
		super: HTMLContainer.prototype, 
		defaultCSS: _.extend({}, HTMLContainer.prototype.defaultCSS, { 
			'display':'block', 
			'padding':'50px', 
			'.HTMLBlock': { 
				display:'inline-block', 
				float:'left' 
			} 
		}), 
		defaults:{ 
			/* DISTRIBUTION TYPE for objects in the row. 'auto' sets even distribution.
			   Number is the percentage of the main object, others get even distribution 
			   Distribution types can be created as well as extensions. 
			*/ 
			distribution: 'auto' 
		}, 
		skeleton: { 
			view: {
				distribution: 'settings.distribution', 
				ins: 'settings.ins', 
				css: 'settings.css'
			}
		}, 
		initialize: function(attrs){ 
			var container = this; 
			HTMLContainer.prototype.initialize.call(this, attrs); 

			//this is a patch up for the tutorial to work until it is fully ready to set on the Block.js Class
			if(attrs && attrs.ins){ 
				_.each(attrs.ins, function(set) {
					container.in.apply(container, set); 
				}); 
			}

			//new block function happens 
			this.on('newBlock', function(child){ 
				container.setGrid(child); 
			}); 
		}, 
		setGrid: function(child){  
			var container = this;  

			var numChildren = container.children.length; 
			var root = Math.sqrt(numChildren); 
			
			if(container.get('distribution') === 'vertical'){
				var width = 100/Math.floor(root) + '%'; 
				var height = 100/Math.ceil(root) + '%'; 

			}else if(container.get('distribution') === 'horizontal'){
				var width = 100/Math.ceil(root) + '%'; 
				var height = 100/Math.floor(root) + '%'; 

			//divide them to fill as a square (even if it doesnt complete)
			}else{
				var width = 100/Math.ceil(root) + '%'; 
				var height = 100/Math.ceil(root) + '%'; 
			}

			//set css object on the view before rendering 
			container.children.each(function(view, index){ 			
				var css = {
					width:width, 
					height:height
				} 
				if(view.css && view.css.set) view.css.set(css); 
			}); 
			return this; 
		} 
	});	
	return GridContainer; 
}); 