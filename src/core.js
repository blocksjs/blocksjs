define(["jquery", "underscore", "backbone", "less", "postal","Block", "Container", "Page"], function($, _, Backbone, less, postal, Block){
    'use strict;'
    var blocks = function(name){
        //it would be cool to have this as a singleton object like jquery 
        //that way you can do blocks('.Panel') and 
        //get an array of the panel objects. 
        //I vote for that!!!! 
    }; 
    blocks.prototype = {
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
                args = Array.prototype.slice(arguments), 
                name, json, callback; 

            //check that the first arg is a name, if not then it should just be the settings json
            if(typeof args[0] === 'string'){
                //first argument is name
                name = args[0]; 

                //allow (name, callback) or (name, json, callback) 
                (typeof args[1] === 'object')? 
                    json = args[1]: 
                    callback = args[1]; 

                //(name, json, callback)
                if(args[2]) callback = args[2]; 

            //options object or json
            }else if(typeof args[0] === 'object'){

                //(json, callback)
                if(args[1]){
                    name = args[0].view.blockClass || 'Block'; 
                    json = args[0]; 
                    callback = args[1]; 
                }
                //(options object)
                else{ 
                    name = args[0].name || 'Block'; 
                    json = args[0].settings || {}; 
                    callback = args[0].callback || function(){}; 
                }
                //or (options object with all three)
                name = name.view.blockClass;
            }

            //get that specific class and use it 
            blocks.getClass(name, function(klass){ 
                //add model and view 
                var ret = {}; 
                ret.model = blocks.createModel(json.modelProps || {}); 
                ret.view = blocks.createView(ret.model, klass, _.extend({}, json.viewProps, {parent: parent})); 

                //load collection 
                if(json.subcollection){ 
                    var arr, modarr, viewarr; 
                    ret.subcollection = arr = []; 
                    modarr = ret.model.subcollection = new Backbone.Collection(); 
                    viewarr = ret.view.subviews = [];  

                    //get models and views from substates 
                    _.each(json.subcollection, function(substate){ 
                        blocks.prototype.createBlock.call(ret.view, substate, function(state){
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
        createModel: function( settings, options ){
            return new Backbone.Model(child.settings || {}, child.options || {}); 
        },  

        //create view
        createView: function(model, prototype, props){
            var controller = this, options, view; 

            //create object and set settings/options 
            options = _.extend({}, props, {model: model}); 

            //delete className property so that it doesn't overwrite the prototype classname 
            if(options.className) delete options.className

            //create and return view
            view = new klass(options); 
            return view; 
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
                    newClass = require(klass); 
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
                $.getScript(settings, function(json){
                    load(json); 
                }); 
            }else{
                load(settings); 
            }

            //load it and then call the callback
            var load = function(json){
                var child = {settings: json}; 

                //if user requests a synchronous rendering then it will wait until the page is ready to render
                if(json.sync) controller._loadPageSync(child.settings.page); 

                //create a reference to all of the classes in the function so we can create objects
                controller.loadClasses(['Block', 'Container', 'Page'].concat(json.classes || []), function(){

                    //create Page block 
                    controller.createBlock(json.page.blockClass || 'Page', null, function(page){ 

                        //start page, if async loading is used then render immediately 
                        child.page = page; 
                        child.href = child.name; 
                        if(!settings.sync) controller.startPage({page: page}); 

                        //cache page 
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
                numChildren = controller.getNumBlocks(json.subcollection); 
            controller.renderState = _.after(numChildren, function(){ 
                controller.startPage(); 
            }); 
            return this; 
        }, 

        //UTILS 
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
            return this.blockList[id]; 
        }, 

        //get array of .Panel blocks
        getBlocksByClassName: function(className){
            return this.blocks[classname]; 
        }, 

        //getBlocksByEnvironmentType: function(){} //get all processing objects, Threejs objects, canvas objects etc...


    };  
    return blocks; 
})