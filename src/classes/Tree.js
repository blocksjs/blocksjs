define(['HTMLContainer'], function(HTMLContainer){ 
	var Tree = HTMLContainer.extend({ 
		blockClass: 'Tree', 
		superClass: 'HTMLContainer', 
		super: HTMLContainer.prototype, 
		defaultCSS: _.extend({}, HTMLContainer.prototype.defaultCSS, {
			/*'-webkit-transform': 'scale(.5)', 
			'-moz-transform': 'scale(.5)', 
			transform: 'scale(.5)', */
			position:'fixed'
		}), 
		skeleton: { 
			view: {
				x: 'settings.x', 
				y: 'settings.y', 
				scaleX: 'settings.scaleX', 
				scaleY: 'settings.scaleY'
			}, 
			children: [
				//stump
				{
					'HTMLBlock':{
						settings: {
							x: [-100, 100, -100, 100, -100, 100], 
							y: [500, 500, 700, 700, 900, 900], 
							"css":{ 
				              "position": "fixed", 
				              "width": "200px", 
				              "height": "200px", 
				              "max-height": "100%", 
				              "max-width": "100%", 
				              "text-align": "center", 
				              "border": "1px black dotted", 
				              "background-color": "rgba(120, 30, 0, .9)", 
				              "z-index": "0", 
				              "&:hover": {
				                "background-color": "rgba(0,0,20,1)", 
				                "color": "white"
				              }
				            }
						}					
					}
				}, 
				//branches
				{
					'HTMLBlock':{
						settings: {
							x: [0, 200, 400, 600, 800, 0, 200, 400, 600, 0, 200, 400, 0, 200, 0, 0, -200, -400, -600, -800, 0, -200, -400, -600, 0, -200, -400, 0, -200, 0], 
							y: [400, 400, 400, 400, 400, 300, 300, 300, 300, 200, 200, 200, 100, 100, 0, 400, 400, 400, 400, 400, 300, 300, 300, 300, 200, 200, 200, 100, 100, 0], 
							"css":{ 
				              "position": "fixed", 
				              "width": "200px",
				              "height": "200px",
				              "max-height": "100%",
				              "max-width": "100%",
				              "text-align": "center",
				              "border": "1px black dotted",
				              "background-color": "rgba(100, 200, 100, .7)",
				              "z-index": "0",
				              "&:hover": {
				                "background-color": "rgba(200,50,50,1)",
				                "color": "white", 
				                "-webkit-transform":"rotateY(360deg)"
				              }
				            }
						}					
					}
				}, 
			]
		}
	});	
	return Tree; 
}); 