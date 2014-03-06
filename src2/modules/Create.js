define(['io'], function(io){ 
    //create model and set settings/options 
    function _createModel( settings, options ){ 
        return new Backbone.Model(settings, options); 
    }; 

    //create view
    function _createView(model, klass, attrs){ 
        var controller = this, view;
        attrs = attrs || {};  

        //add model  
        _.extend(attrs, {model: model}); 

        //create and return view 
        return new klass(attrs); 
    }; 
    function _createSkeleton(settings){ 
        //for each thing in the subcollection, create a model and pass in those settings 
        var block = this, 
            skeleton = block.skeleton, 
            ret = {}; 
        if(!skeleton) return; 
        //set model and view 
        if(model = skeleton.model)  ret.model = _extractVals(model, settings); 
        if(view = skeleton.view)    ret.view = _extractVals(view, settings); 
        if(children = skeleton.children)
            ret.subcollection = _extractValsCollection(children, settings); 
        return ret; 
    }; 
    function _extractVals(ob, settings){ 
        var obSettings = {}; 
        //need to find settings and put them on the object before we create the model
        _.each(ob, function(val, key, list){ 
            var keys = val.split('.'), attrVal, attrKey; 

            //allow 'settings.anyAttribute' optionally 
            if(keys[0] === 'settings' || keys[0] === 'Settings'){
                keys.shift(); 

                 //include attributes? 
                //keys[0] should be the attribute name, i.e 'videoIDs' 
                attrKey = keys[0]; 

                //if that attribute exists in the hash 
                if(settings && settings[attrKey]){ 

                    //allow us to set properties from an array, videoIDs[] for example 
                    if(keys[1] && _.isArray( settings[attrKey] )){ 

                        //if we use 'settings.videoIDs.1' it should correspond to the position in the array 
                        if(_.isNumber(keys[1])){
                            attrVal = settings[attrKey][num]; 

                        //else create a block for everything in the array 
                        }else if(keys[1] === '*'){ 
                            attrVal = []; 
                            _.each(settings[attrKey], function(val, index, list){ 
                                attrVal.push(val); 
                            }); 
                        }

                    //else just use the attribute (even if it is an)
                    }else{
                        attrVal = settings[attrKey]; 
                    } 
                } 

            //else just use the provided template
            }else{
                attrVal = keys[0]; 
            }

           

            //set it on th return object
            if(attrVal) 
                obSettings[key] = attrVal; 
        }); 
        return obSettings; 
    }; 
    function _extractValsCollection(collection, settings){ 

        var block = this; 
        var colSettings = [], models, views; 

        //need to find settings and put them on the object before we create the model 
        _.each(collection, function(val, key, list){ 
            var blockClass = key; 
            var attrVal, modelArr = [], viewArr = []; 

            //get model and view settings 
            if(!val.settings){
                if(model = val.model) models = _set(block._extractVals(model, settings));                  
                if(view = val.view)   views = _set(block._extractVals(view, settings)); 
                colSettings = colSettings.concat(_createCollection(blockClass, models, views)); 
            }else{
                colSettings.push({
                    blockClass: blockClass,
                    settings: val.settings
                }); 
            }            
        }); 

        //return the collection of models/views 
        return colSettings;             
    }; 

    /*_EXTRACT VALS function will return an array if the requested value is an array. 
    this function takes those values and places them on individual objects 
    for example we would have something like...
    model :{
        id: ['woefjwo', '2', '4', 'fjjf'], 
        x: 5, 
        color: 'green' 
    }
    but we need to make sure there are 4 models with those properties based on the 
    largest array (ids). */ 
    function _set(props){ 
        var arr = [], 
            numTimes = 1; 

        //find number of times to create models/views based on the array with the greatest length 
        _.each(props, function(prop){ 
            if(_.isArray(prop) && prop.length > numTimes) numTimes = prop.length; 
        }); 

        //create those models/views  
        _.times(numTimes, function(index){ 
            var newModel = {}; 
            _.each(props, function(val, key, list){ 

                //if it is an array of values use array[0] and shift it off   
                if(_.isArray(val)) newModel[key] = val.shift(); 
                else newModel[key] = val; 
            });  
            arr.push(newModel);  
        }); 

        //return collection 
        return arr; 
    }

    //takes the array of models and the array of views to put 
    //into an array of model/view pairs for the collection object 
    function _createCollection(blockClass, models, views){
        var ret = [], 
            models = models || [], 
            views = views || [], 
            len = (models.length > views.length)? models.length: views.length; 

        //pair them x times where x is the maximum length
        _.times(len, function(index){ 
            var ob = {}; 
            ob.blockClass = blockClass; 

            //set model and view
            if(model = models[index])   ob.model = model; 
            else if(model = models[0]) ob.model = model; //repeat model[0] if necessary to complete the array 

            if(view = views[index])   ob.view = view; 
            else if(view = views[0]) ob.view = view; 
            ret.push(ob); 
        }); 
        return ret; 
    }

    //MODULE DEFINITION 
	return { 
		//create a block from the options. If no class is specific then Block will be created 
        createBlock: function recurse(){ 
            if(arguments.length === 0) return; 
            var block = this, 
                blocks = window.blocks || {}, 
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

            //SKELETON!!!!!
            if(json.settings){
                console.log('old json'); 
                var skel = _createSkeleton.call(block, json.settings); 
                _.extend(json, skel); 
                console.log('new json', json); 
            }

            //get that specific class and use it 
            io.getClass.call(block, blockClass, function(klass){ 
                //add model and view 
                var ret   = {}; 
                ret.model = _createModel(json.model || {}); 
                ret.view  = _createView(ret.model, klass, _.extend({}, json.view, { 
                    parent: block 
                })); 
                if(block.model && block.model.subcollection) block.model.subcollection.add(ret.model); 
                if(block.subcollection) block.subcollection.add(ret.view); 

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
        }
	}	
}); 