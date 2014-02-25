define(["jquery", "underscore", "backbone", "less", "postal","Block", "Container", "Page"], function($, _, Backbone, less, postal, Block){
    'use strict;'
    var core = function(settings, callback){
        //it would be cool to have this as a singleton object like jquery 
        //that way you can do blocks('.Panel') and 
        //get an array of the panel objects. 
        //I vote for that!!!! 
        var controller = this; 
        if(settings) this.loadPage(settings, callback); 
    }; 
    core.prototype = { 
        postal: postal, 
        _blockIds: {}, //a hash of all blocks by id and the object associated with that id 
        _userBlockIds: {}, //a hash of special Ids users provide for blocks with the value being the _blockId of the object 
        _classList: {}, //list of classes and an array of blockIds for each of those classes 
        //Create functions 

        //create a block from the options. If no class is specific then Block will be created 
        createBlock: function(){
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
                    name = (args[0].view && args[0].view.blockClass)?
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
            blocks.getClass(blockClass, function(klass){ 
                //add model and view 
                var ret   = {}; 
                ret.model = blocks._createModel(json.model || {}); 
                ret.view  = blocks._createView(ret.model, klass, _.extend({}, json.view, {
                    parent: parent
                }));
                blocks._set(ret.view); 

                //load collection 
                if(json.subcollection){ 
                    var arr, modarr, viewarr; 
                    ret.subcollection = arr = []; 
                    modarr = ret.model.subcollection = new Backbone.Collection(); 
                    viewarr = ret.view.subviews = [];  

                    //get models and views from substates 
                    _.each(json.subcollection, function(substate){ 
                        core.prototype.createBlock.call(ret.view, substate, function(state){
                            arr.push(state); 
                            modarr.add(state.model); 
                            viewarr.push(state.view); 
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
        _createView: function(model, klass, options){ 
            var controller = this, options, view; 

            //add model 
            _.extend(options, {model: model}); 

            //create and return view 
            return new klass(options); 
        }, 

        ///save the state of the page somewhere 
        /*saveState: function( page, name, location, callback ){ 

        }, */ 

        //IO functions 
        getClass: function(name, callback, ctx){ 
            this.loadClasses([name], callback, ctx); 
        }, 

        //returns an array of class prototypes that were asked for 
        loadClasses: function( classes, callback, ctx ){ 
            if(!classes) return []; 
            var controller = this, 
                cache = []; 

            //require classes 
            require(['require'].concat(classes || []), function(require){ 
                _.each(classes, function(klass){  
                    var newClass; 
                    if(klass) newClass = require(klass); 
                    cache.push(newClass);           
                }); 
                if(typeof callback === 'function'){ 
                    (cache.length === 1)? callback.call(ctx || null, cache[0]): 
                        callback.call(ctx || null, cache); 
                } 
            }); 
        }, 

        //takes the state JSON and creates a page collection  
        loadPage: function( settings, callback ){ 
            //adds all of the classes from the settings.classes list, prefixes it with require so we can call them later 
            var controller = this; 

            //check to see if the first arg is json or a reference to the json  
            if(typeof settings === 'string'){ 
                require(['json!'+ settings], function(json){ 
                    load(json); 
                }); 
            }else{ 
                load(settings); 
            } 

            //load it and then call the callback 
            function load(json){ 
                var child = {settings: json}; 

                //if user requests a synchronous rendering then it will wait until the page is ready to render
                if(json.sync) controller._loadPageSync(child.settings.page); 

                //create a reference to all of the classes in the function so we can create objects
                controller.loadClasses(['Block', 'Container', 'Page'].concat(json.classes || []), function(){

                    //create Page block 
                    controller.createBlock(json.content.view.blockClass || 'Page', json.content || {}, function(page){ 

                        //start page, if async loading is used then render immediately 
                        child.content = page; 
                        if(!settings.sync) page.view.render(); 

                        //cache page and create collection if it doesn't exist
                        (controller.collection)? 
                            controller.pages.push(child): 
                            controller.pages = [child];   

                        if(typeof callback === 'function') callback(child);  
                    }); 
                }); 
            }; 
            
        },  
        _loadPageSync: function(json){
            var controller = this,
                numChildren = controller.getNumBlocks(json.content); 

            controller.renderState = _.after(numChildren, function(){ 
                controller.pages[0].view.render(); 
            }); 
            return this; 
        }, 

        //UTILS 
        //Set _blockID, _userBlockID, and blockClass 
        _set: function(block){ 
            var blockId = block._blockID ||_.uniqueId('_block'), 
                userId  = block.get('blockID'), 
                classes = block.getClassAncestry().concat(block.blockClass); 

            //set _blockID 
            block._blockID = blockId; 
            blocks._blockIds[blockId] = block; 

            //set special user id 
            if(userId){ 
                blocks._userBlockIds[userId] = blockId; 
            } 

            //set classes
            _.each(classes, function(className){
                if(className !== 'Block'){
                    if(!blocks._classList[className]) blocks._classList[className] = []; 
                    blocks._classList[className].push(blockId); 
                }
            }); 
        },
        _remove: function(block){
            var blockId = block._blockID,
                userId = block.get('blockID'), 
                classes = block.getClassAncestry(); 

            //remove _blockID
            block._blockID = blockId; 
            delete blocks._blockIds[blockId]; 

            //set special user id
            if(userId){
                delete blocks._userBlockIds[userId]; 
            }

            //set classes
            _.each(classes, function(className){
                var index = _.indexOf(blocks._classList[className], blockId); 
                blocks._classList[className].splice(index,1); 
            }); 
        }, 

        //find number of objects to be rendered from the collection 
        getNumBlocks: function(collection){ 
            var numBlocks = 0; 
            (function recurse(collection){ 
                _.each(collection, function(child){ 
                    numBlocks++; 
                    if(child.subcollection) recurse(child.subcollection); 
                }); 
            })(collection); 
            return numBlocks; 
        }, 

        //return block with _blockId
        getBlockById: function(id){
            return this._blockIds[id]; 
        }, 

        //get array of .Panel blocks
        getBlocksByClassName: function(className){
            return this._classList[className]; 
        }, 

        //getBlocksByEnvironmentType: function(){} //get all processing objects, Threejs objects, canvas objects etc...


    };  
    return core; 
}); 