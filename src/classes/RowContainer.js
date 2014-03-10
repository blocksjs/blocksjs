define(['HTMLContainer'], function(HTMLContainer){ 
	var RowContainer = HTMLContainer.extend({ 
		blockClass: 'RowContainer', 
		superClass: 'HTMLContainer', 
		super: HTMLContainer.prototype, 
		defaultCSS: _.extend({}, HTMLContainer.prototype.defaultCSS, { 
			'height':'70px', 
			'.HTMLBlock': { 
				'min-width':0, 
				'min-height':0, 
				display:'inline-block', 
				float:'left', 
				overflow:'hidden', 
				padding:'5px', 
				'*':{
					width:'100%', 
					height:'100%'
				}, 
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
				container.setRows(child); 
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
		setRows: function(child){  
			var container = this;  

			var width = container.get('distribution'); 
			var numChildren = container.children.length; 

			//if width auto set every block to have same width 
			if(width === 'auto'){ 
				var main = rest = (1/numChildren)*100 + '%'; 
			}else{
				if(!_.isNumber(width)) return new Error('This distribution is not recognized'); 
				var main = width + '%'; 
				var rest = (100 - width)/(numChildren - 1) + '%'; //Rest of children are evenly distributed in the leftover space
			}

			//set css object on the view before rendering 
			container.children.each(function(view, index){ 			
				var css = (index === 0)? 
					{width: main}: 
					{width: rest}; 
				if(view.css && view.css.set) view.css.set(css); 
			}); 
			return this; 
		} 
	});	
	return RowContainer; 
}); 