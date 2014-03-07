define(['HTMLContainer'], function(HTMLContainer){ 
	var HTMLContainer2 = HTMLContainer.extend({ 
		blockClass: 'HTMLContainer2', 
		superClass: 'HTMLContainer', 
		super: HTMLContainer.prototype, 
		/*skeleton: { 
			children: {
				'HTMLBlock':{
					view: {
						x: 'settings.x.*', 
						y: 'settings.y.*', 
						css: {
							"position": "fixed",
				            "width": "200px",
				            "height": "200px",
				            "max-height": "100%",
				            "max-width": "100%",
				            "text-align": "center",
				            "border": "1px black dotted",
				            "background-color": "rgba(0, 0, 100, .7)",
				            "z-index": "0",
				            "&:hover": {
				              "background-color": "rgba(0,0,20,1)",
				              "color": "white"
				            }
						}
					}					
				}
			}
		}, */
		skeleton: { 
			children: {
				'HTMLBlock':{
					blockClass: 'HTMLBlock', 
					settings: {
						x: 'settings.x.*', 
						y: 'settings.y.*', 
						css: {
							"position": "fixed",
				            "width": "200px",
				            "height": "200px",
				            "max-height": "100%",
				            "max-width": "100%",
				            "text-align": "center",
				            "border": "1px black dotted",
				            "background-color": "rgba(0, 0, 100, .7)",
				            "z-index": "0",
				            "&:hover": {
				              "background-color": "rgba(0,0,20,1)",
				              "color": "white"
				            }
						}
					}					
				}
			}
		}
	});	
	return HTMLContainer2; 
}); 