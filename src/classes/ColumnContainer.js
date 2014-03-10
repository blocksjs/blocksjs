define(['HTMLContainer'], function(HTMLContainer){ 
	var ColumnContainer = HTMLContainer.extend({ 
		blockClass: 'ColumnContainer', 
		superClass: 'HTMLContainer', 
		super: HTMLContainer.prototype, 
		defaultCSS: _.extend({}, HTMLContainer.prototype.defaultCSS, { 
			'width':'70px', 
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
		initialize: function(attrs){ 
			var container = this; 
			HTMLContainer.prototype.initialize.call(this, attrs); 

			//new block function happens 
			this.on('newBlock', function(child){ 
				container.setColumns(child); 
			}); 
		}, 
		skeleton: { 
			view: {
				distribution: 'settings.distribution'
			}, 
			children: [ 
				//stump 
				{ 
					'Button':{ 
						settings: { 
							text: 'settings.text.*', 
							message: 'settings.message.*' 
						}					
					} 
				} 
			] 
		}, 
		setColumns: function(child){  
			var container = this;  

			var height = container.get('distribution'); 
			var numChildren = container.children.length; 

			//if height auto set every block to have same height 
			if(height === 'auto'){ 
				var main = rest = (1/numChildren)*100 + '%'; 
			}else{
				if(!_.isNumber(height)) return new Error('This distribution is not recognized'); 
				var main = height + '%'; 
				var rest = (100 - height)/(numChildren - 1) + '%'; //Rest of children are evenly distributed in the leftover space
			}

			//set css object on the view before rendering 
			container.children.each(function(view, index){ 			
				var css = (index === 0)? 
					{height: main}: 
					{height: rest}; 
				if(view.css && view.css.set) view.css.set(css); 
			}); 
			return this; 
		} 
	});	
	return ColumnContainer; 
}); 