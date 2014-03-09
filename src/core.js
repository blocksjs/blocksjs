define(["jquery", "underscore", "backbone", "less", "postal","Block", "Container", "Page", "create", "io", "query", "load"], function($, _, Backbone, less, postal, Block, Container, Page,create, io, query, load){
    'use strict;' 
    var core = function(settings, callback){ 
        //it would be cool to have this as a singleton object like jquery 
        //that way you can do blocks('.Panel') and 
        //get an array of the panel objects. 
        //I vote for that!!!! 
        var controller = this; 
        if(settings) this.loadPage(settings, callback); 
        window.postal = postal; 
    }; 
    core.prototype = { 
        _blockIds: {}, //a hash of all blocks by id and the object associated with that id 
        _userBlockIds: {}, //a hash of special Ids users provide for blocks with the value being the _blockId of the object 
        _classList: {}, //list of classes and an array of blockIds for each of those classes 

        //UTILS 
        //Set _userBlockID, and blockClass 
        _set: function(block){ 
            var blockId = block._blockID, 
                userId  = block.get('blockID'), 
                classes = block.getClassAncestry().concat(block.blockClass);

            //set _blockID 
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

            return this; 
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

            return this; 
        }
    };  
    _.extend(core.prototype, create, io, load, query); 
    return core; 
}); 
