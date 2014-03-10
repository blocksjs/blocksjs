define(['GridContainer'], function(GridContainer){ 
	var ImageButtonGridContainer = GridContainer.extend({ 
		blockClass: 'ImageButtonGridContainer', 
		superClass: 'GridContainer', 
		super: GridContainer.prototype, 
		skeleton: { 
			view: { 
				distribution: 'settings.distribution', 
				ins:'settings.ins', 
				css: 'settings.css'
			}, 
			children: [ 
				//stump 
				{ 
					'ImageButton':{ 
						settings: { 
							img: 'settings.img.*', 
							message: 'settings.message.*' 
						}					
					} 
				} 
			] 
		}
	});	
	return ImageButtonGridContainer; 
}); 