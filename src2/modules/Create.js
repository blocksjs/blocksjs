define(['io'], function(io){ 
	return { 
		//create a block from the options. If no class is specific then Block will be created 
        createBlock: function recurse(){ 
            if(arguments.length === 0) return; 
            var parent = this, 
                blocks = window.blocks, 
                args = Array.prototype.slice.call(arguments), 
                blockClass = '', json = {}, callback; 

            //check that the first arg is a name, if not then it should just be the settings json
            if(_.isString(args[0])){
                //first argument is name
                blockClass = args[0]; 

                //allow (name, callback) or (name, json, callback) 
                (!_.isFunction(args[1]))? 
                    json = args[1]: 
                    callback = args[1]; 

                //(name, json, callback)
                if(_.isFunction(args[2])) callback = args[2]; 

            //options object or json
            }else if(_.isObject(args[0])){

                //(json, callback)
                if(_.isFunction(args[1])){

                    //if the json has a view.blockClass property, else Block
                    blockClass = (args[0].view && args[0].view.blockClass)?
                                args[0].view.blockClass: 
                                'Block'; 

                    json = args[0]; 
                    callback = args[1]; 
                }
                //({options})
                else{ 

                    //name is...
                    blockClass = 

                        //either the blockClass property
                        (args[0].blockClass)? args[0].blockClass: 

                        //or view.blockClass property
                        (args[0].view && args[0].view.blockClass)?   args[0].view.blockClass: 

                        //or Block by default
                        'Block'; 
                        
                    json = args[0].settings || args[0]; 
                    callback = args[0].callback || null; 
                }
            }

            //get that specific class and use it 
            io.getClass(blockClass, function(klass){ 
                //add model and view 
                var ret   = {}; 
                ret.model = blocks._createModel(json.model || {}); 
                ret.view  = blocks._createView(ret.model, klass, _.extend({}, json.view, { 
                    parent: parent 
                })); 
                if(parent.model && parent.model.subcollection) parent.model.subcollection.add(ret.model); 
                if(parent.subcollection) parent.subcollection.add(ret.view); 

                //load collection 
                if(json.subcollection){ 
                    var arr, modarr, viewarr; 
                    ret.subcollection = arr = []; 
                    modarr = ret.model.subcollection = new Backbone.Collection(); 
                    viewarr = ret.view.subcollection;  

                    //get models and views from substates 
                    _.each(json.subcollection, function(substate){ 
                        recurse.call(ret.view, substate, function(state){
                            arr.push(state); 
                            modarr.add(state.model); 
                            viewarr.add(state.view); 
                            ret.view.trigger('newBlock', state); 
                        }); 
                    }); 
                } 
                if(typeof callback === 'function') callback(ret);           
            }); 
        }, 
        //create model and set settings/options 
        _createModel: function( settings, options ){ 
            return new Backbone.Model(settings, options); 
        },  

        //create view
        _createView: function(model, klass, attrs){ 
            var controller = this, view;
            attrs = attrs || {};  

            //add model  
            _.extend(attrs, {model: model}); 

            //create and return view 
            return new klass(attrs); 
        }
	}	
}); 