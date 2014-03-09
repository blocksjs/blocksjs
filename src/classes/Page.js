define(["HTMLContainer", "postal"], function(HTMLContainer, Postal){ 
	//Page View 
	var Page = HTMLContainer.extend({ 
		blockClass: 'Page', 
		superClass: 'HTMLContainer',  
		super: HTMLContainer.prototype,
		defaultCSS: _.extend({}, HTMLContainer.prototype.defaultCSS, { 
			position:'fixed', 
			width	: '100%', 
			height	: '100%', 
			'*':{ 
				'box-sizing': 'border-box', 
				'-moz-box-sizing': 'border-box', 
				'-webkit-box-sizing': 'border-box', 
			} 
		}), 
		render: function(){ 
			//generic render call 
			HTMLContainer.prototype.render.call(this); 
			$('body').append(this.el); 
			
		    //renderCSS 
			this.renderCSS(); 

			//tell everything that is has it rendered 
			Postal.publish('pageRender'); 

			return this; 
	   	}, 
		renderCSS 	: function(){	
			//create stylesheet and keep reference to the node 
			if(!this.styleSheet){ 
				var style = document.createElement('style'); 
				style.type = 'text/less';  
				style.id = this.el.id + '_style'; 
				style.innerHTML = 'body {margin:0}' + this.css.renderDefaultCSS() + this.css.render(); 
				this.styleSheet = document.head.appendChild(style); 
			}else{ 
				this.styleSheet.type = 'text/less';  
				this.styleSheet.innerHTML = 'body {margin:0}' + this.css.renderDefaultCSS() + this.css.render();
			}  
			less.refreshStyles(); 
		},  
		saveState: function(){
			var ret = {
				name: this.name, 
				content: HTMLContainer.prototype.toJSON.call(this), 
				classes: [this.blockClass]
			}; 

			//if collection create an array substates 
			(function addClasses(child){
				if(child.subcollection && child.subcollection.length > 0){ 
					child.subcollection.each(function(subview){ 
						var newClasses = [subview.blockClass].concat(subview.getClassAncestry()); 
						ret.classes = ret.classes.concat(newClasses); 
						addClasses(subview); 
					}); 
				}
			})(this); 	
			ret.classes = _.uniq(ret.classes); 
			//console.log('RET: ', ret); 	
			//return the page object as necessary for the settings json object to load the page later 
			return ret
		}, 
	});  
	return Page; 
}); 