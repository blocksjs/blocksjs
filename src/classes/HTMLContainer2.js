define(['HTMLContainer'], function(HTMLContainer){ 
	var HTMLContainer2 = HTMLContainer.extend({ 
		blockClass: 'HTMLContainer2', 
		superClass: 'HTMLContainer', 
		super: HTMLContainer.prototype, 
		skeleton: { 
			children: [
				{
					blockClass: 'HTMLBlock', 
					settings: {
						x: 'settings.x.1', 
						y: 400, 
						"css":{ 
			              "position": "fixed", 
			              "width": "400px",
			              "height": "400px",
			              "max-height": "100%",
			              "max-width": "100%",
			              "text-align": "center",
			              "border": "1px orange dotted",
			              "background-color": "green",
			              "z-index": "0",
			              "&:hover": {
			                "background-color": "rgba(0,0,0,1)",
			                "color": "white"
			              }
			            }
					}
				}, 
				{
					blockClass: 'HTMLBlock', 
					view: {
						blockClass: 'HTMLBlock', 
						x: 500, 
						y: 500, 
						"css":{ 
			              "position": "fixed", 
			              "width": "400px",
			              "height": "400px",
			              "max-height": "100%",
			              "max-width": "100%",
			              "text-align": "center",
			              "border": "1px black dotted",
			              "background-color": "rgba(0, 100, 100, .7)",
			              "z-index": "0",
			              "&:hover": {
			                "background-color": "rgba(0,0,0,1)",
			                "color": "white"
			              }
			            }
					}
				}, 
				{
					'HTMLBlock':{
						settings: {
							x: 'settings.x.*', 
							y: 'settings.y.*', 
							background:"settings.background", 
							"css":{ 
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
				}, 
				{
					'HTMLBlock':{
						settings: {
							x: 'settings.y.*', 
							y: 'settings.x.*', 
							background:"settings.background", 
							"css":{ 
				              "position": "fixed", 
				              "width": "200px",
				              "height": "200px",
				              "max-height": "100%",
				              "max-width": "100%",
				              "text-align": "center",
				              "border": "1px black dotted",
				              "background-color": "rgba(100, 0, 100, .7)",
				              "z-index": "0",
				              "&:hover": {
				                "background-color": "rgba(0,0,20,1)",
				                "color": "white"
				              }
				            }
						}					
					}
				}
			]
		}
	});	
	return HTMLContainer2; 
}); 