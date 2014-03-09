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
    function _createSkeleton(skeleton, settings){ 
        if(!skeleton) return; 

        //set model, view and blockClass 
        var ret = {};   
        if(blockClass = skeleton.blockClass) 
            ret.blockClass = blockClass; 
        if(model = skeleton.model)  
            ret.model = _extractVals(model, settings); 
        if(view = skeleton.view)    
            ret.view = _extractVals(view, settings); 
        if(subcollection = (skeleton.children || skeleton.subcollection)) 
            ret.subcollection = _extractValsCollection(subcollection, settings); 
        return ret; 
    }; 
    function _extractVals(ob, settings){ 
        var obSettings = {}; 

        //need to find settings and put them on the object before we create the model 
        _.each(ob, function(val, key, list){ 
            if(_.isString(val)){ 
                var keys = val.split('.'), attrVal, attrKey; 

                //allow 'settings.anyAttribute' to get the value from settings at runtime 
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

                //else just use the provided text 
                }else{ 
                    attrVal = keys[0]; 
                } 
            }else{ 
                attrVal = val; 
            } 
            
            //set it on th return object 
            if(attrVal) obSettings[key] = attrVal; 
        }); 
        return obSettings; 
    }; 
    function _extractValsCollection(collection, settingsOb){ 
        var block = this; 
        var colSettings = [], models, views; 

        //if it is an array do this on all children and return the result (makes it recursive); 
        if(_.isArray(collection)){ 
            _.each(collection, function(val){ 
                colSettings = colSettings.concat(_extractValsCollection(val, settingsOb)); 
            }); 
            return colSettings; 
        } 

        //first check to see what the outline of the object is... 

        //if it is {blockClass: 'name', view: {}, model: {}} 
        if(collection.view && (collection.view.blockClass || collection.blockClass)){
            var ret = _createSkeleton(collection, settingsOb); 
            colSettings.push(ret);         

        //else if it is {blockClass:'name', settings:{}}
        }else if(collection.settings){ 
            if(!collection.blockClass) return new Error('should specify blockClass'); 
            var ret = _extractVals(collection.settings, settingsOb); 
            colSettings.push({ 
                blockClass: collection.blockClass, 
                settings: ret 
            });         

        //else if it is the variable number of things {'blockClass':{settings for them}, 'blockClass2':{settings}} etc
        }else{ 
            //need to find settings and put them on the object before we create the model 
            _.each(collection, function(val, key, list){ 

                //if key is a number then it is the index, we should assess the object inside. 
                var blockClass = key; 
                var attrVal, modelArr = [], viewArr = []; 

                //get model and view settings 
                if(!val.settings){ 
                    if(model = val.model) models = _setVals(_extractVals(model, settingsOb));                  
                    if(view = val.view)   views = _setVals(_extractVals(view, settingsOb)); 
                    var col = _createCollection(blockClass, models, views); 
                    colSettings = colSettings.concat(col); 
                }else{ 
                    var blockClass = val.blockClass || key; 
                    var returnArr = _setVals(_extractVals(val.settings, settingsOb)); 
                    _.each(returnArr, function(setting){ 
                        var thing = { 
                            "settings": setting, 
                            blockClass: blockClass 
                        };
                        var otherThing = {
                            settings: setting,
                            blockClass: blockClass
                        };

                        //SUPER STRANGE BUG!!!!
                        //IF you check both of these objects in the console they should be the same BUT 
                        //the object that gets pushed to colSettings actually has a model and view object, which it should not. 
                        //this happens somewhere asynchronously so it wont show up if you step through each of the functions one by one. 
                        //it only happens if it all runs at once, but this is strange. 
                        //WHYYYYYYYYYYYYYYYYYYYYYYYYYY!?!?!?!?!?!?!?!!?!?!?!?!?!?
                        colSettings.push(otherThing); 
                    });          
                }            
            }); 
        }
        

        //return the collection of models/views 
        return colSettings;             
    }; 

    /*_SETVALS will use the return array from _EXTRACT VALS 
    and place them on individual objects 
    for example we would have something like...
    model :{
        id: ['woefjwo', '2', '4', 'fjjf'], 
        x: 5, 
        color: 'green' 
    }
    but we need to make sure there are 4 models with those properties based on the 
    largest array (ids). */ 
    function _setVals(props){ 
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
                //var copy = val.slice(); 

                //if it is an array of values use array[0] and shift it off   
                if(_.isArray(val)) newModel[key] = val[index]; 
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

    //create a block from the options. If no class is specific then Block will be created 
    function createBlock(){ 
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

                //if the json has blockClass, view.blockClass property, else Block 
                blockClass =(args[0].blockClass)?                      args[0].blockClass: 
                            (args[0].view && args[0].view.blockClass)? args[0].view.blockClass: 
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
        io.getClass.call(block, blockClass, function(klass){ 
            //add model and view 
            var ret   = {}; 

            //SKELETON!!!!!
            if(json.settings){ 
                var skel = _createSkeleton(klass.prototype.skeleton, json.settings); 
                _.extend(json, skel); 
            } 

            ret.model = _createModel(json.model || {}); 
            ret.view  = _createView(ret.model, klass, _.extend({}, json.view, { 
                parent: block 
            })); 
            if(block.model && block.model.subcollection) block.model.subcollection.add(ret.model); 
            if(block.subcollection) block.subcollection.add(ret.view); 

            //load collection 
            if(json.subcollection || json.children){ 
                var arr, modarr, viewarr, subcol = (json.subcollection || json.children); 
                ret.subcollection = arr = []; 
                modarr = ret.model.subcollection = new Backbone.Collection(); 
                viewarr = ret.view.subcollection;  

                //get models and views from substates 
                _.each(subcol, function(substate){ 
                    createBlock.call(ret.view, substate, function(state){
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

    //MODULE DEFINITION 
	return { 
        createBlock: createBlock, 
        _createSkeleton: _createSkeleton, 
        _extractVals: _extractVals, 
        _extractValsCollection: _extractValsCollection, 
        _setVals: _setVals, 
        _createCollection: _createCollection 
    }
}); 