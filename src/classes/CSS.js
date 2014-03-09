define(['require','jquery', 'underscore', 'backbone'], function(require, $, _, Backbone){ 
		'use strict';  
		var CSS = function(attributes, options){ 
			var active; 
			//set initial properties 
			active = _.extend({}, attributes); 
			this.active = active; 
			this.parent = options.parent; 
			this.defaultInlineProperties= []; 

			//add Backbone Events and update the active property list on change 
			this.on('change', this.update, this); 

			//transform changes 
			this.parent.on('change', function(){
				this.inline({ 
					'transform': 'translateX(' + this.parent.x + 'px)', 
					'-webkit-transform': 'translateX(' + this.parent.x + 'px)', 
					'-moz-transform': 'translateX(' + this.parent.x + 'px)'
				}); 
			}, this); 
		}; 

		CSS.prototype = _.extend({}, Backbone.Events, { 
			transform: function (){
				var ret, parent, x, y, z, rotX, rotY, rotZ, scaleX, scaleY, scaleZ, skewX, skewY; 
				ret = '',
				parent = this.parent, 
				x 	   = parent.get('x') || 0, 
				y 	   = parent.get('y') || 0, 
				z 	   = parent.get('z') || 0, 
				rotX   = parent.get('rotateX'), 
				rotY   = parent.get('rotateY'), 
				rotZ   = parent.get('rotateZ'), 
				scaleX = parent.get('scaleX'), 
				scaleY = parent.get('scaleY'), 
				scaleZ = parent.get('scaleZ'), 
				skewX  = parent.get('skewX'), 
				skewY  = parent.get('skewY'); 

				//transform properties
				if(x !== 0 || y !== 0 || z !== 0) ret += 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px ) '; 

				//rotate properties 
				if(rotX) ret += 'rotateX(' + rotX + 'deg) '; 
				if(rotY) ret += 'rotateY(' + rotY + 'deg) '; 
				if(rotZ) ret += 'rotateZ(' + rotZ + 'deg) '; 

				//scale properties
				if(scaleX || scaleY) ret += 'scale3d(' + (scaleX || 0) + ', ' + (scaleY || 0) + ') '; 

				//skew properties
				if(skewX || skewY) ret += 'skew(' + (skewX || 0) + 'deg, ' + (skewY || 0) + 'deg) '; 

				//return object with domstring for each type of browser
				return {
					'transform': ret, 
					'-webkit-transform': ret, 
					'-moz-transform': ret
				}

			},
			get: function(name){
				return this.active[name]; 
			},
			update: function(css){
				_.extend(this.active, css);
				return this; 
			},

			//removes all inline styles except for those listed in the arguments and default inline propertes
			inline: function(){
				var css, args; 

				//get list of exceptions 	
				args = Array.prototype.slice.call(arguments);
				args.concat(this.defaultInlineProperties); 

				//get properties of exceptions and transform properties
				css = _.extend({}, this.parent.$el.css(args), this.transform());  

				//clear and replace inline style
				this.parent.$el.attr('style', '');
				this.parent.$el.css(css); 

				return this.parent;
			},

			/*Returns a list of .Class{classCSS} for all Block prototypes on the page.
			This is meant to be called once from the page context, so all of its children 
			are included in its style object */ 
			renderDefaultCSS: function(){ 
				//copy the version for blocks 
				var css = this, 
					CSSstring = '', 
					parent = css.parent, 
					classes = [parent.blockClass].concat(parent.getClassAncestry()); 

				//get list of classes 
				(function addClasses(child){ 
					if(child.subcollection && child.subcollection.length > 0){ 
						child.subcollection.each(function(subview){ 
							var newClasses = [subview.blockClass]; 
							classes = classes.concat(newClasses); 
							addClasses(subview); 
						}); 
					} 
				})(this.parent); 	
				classes = _.uniq(classes); 

				//put each of the default css into the thang				
				_.each(classes, function(klass){					
					var klass = require(klass); 
					if(klass.prototype && klass.prototype.defaultCSS){
						var prot = klass.prototype; 
						CSSstring += css.renderDOMString(prot.defaultCSS, '.' + prot.blockClass);
					}						
				}); 
				

				//append .Class {classCSS} for the parent 
				/*CSSstring += css.renderDOMString(parent.constructor.prototype.defaultCSS, '.' + parent.blockClass); 
			
				//let children define their class css as well 
				if( parent.subcollection && parent.subcollection.length > 0){ 
					parent.subcollection.each(function(view){ 
						if(!classes[view.blockClass] && view.css){ 
							CSSstring += view.css.renderDefaultCSS(); 
							classes[view.blockClass] = true; 
						}
					}); 
				}; 		
				console.log(CSSstring); */			
				return CSSstring;  
			},

			//Renders individual block css. Meant to be called by each object on the page, like render
			render : function(){ 
				var css, CSSstring; 
				css = this; 
				CSSstring = '#' + this.parent.id + ' { '; 
				//check that there are active properties to add to the CSS string
				if( css.active !== null ){
					//print each of the active qualities
					_.each(css.active, function(key, value, list){
						CSSstring += css.renderDOMString(key, value, list); 
					}); 
			
				}; 

				//let children define their css as well 
				if( css.parent.subcollection && css.parent.subcollection.length > 0){ 
					css.parent.subcollection.each(function(view){ 
						if(view.css)
							CSSstring += view.css.render(); 
					}); 
				}; 

				//end
				CSSstring += ' } '; 

				//add inline CSS if necessary 
				this.inline(); 
				return CSSstring;  
			}, 

			//renders a list of CSS values as 'key': 'value'; 
			renderDOMString: function(value, key){
				var css = this; 
				//if the value is a string, print it
				if(_.isString(value) || _.isNumber(value)){
					var string = key + ' : ' + value + ' ; ';
					return string; 

				//else if it is an object, wrap the object and print 
				//its properties in the same way 
				}else if(_.isObject(value)){
					var string =  key + ' { '; 
					_.each(value, function(rule, name){
						string += css.renderDOMString(rule, name); 
					})
					string += ' } '; 

					return string; 
				}			
			},
		}); 

		return CSS; 
	}			
); 