define(["jquery", "underscore", "backbone", "less", "postal","Block"], function($, _, Backbone, less, postal, Block){
    'use strict;'
    var blocks = function(name){
        //it would be cool to have this as a singleton object like jquery 
        //that way you can do blocks('.Panel') and 
        //get an array of the panel objects. 
        //I vote for that!!!! 
    }; 
    blocks.prototype = {
        modules: [], 
        postal: postal, 
        blockList: {}, //a hash of all blocks by id and the object associated with that id 
        userBlockList: {}, //a hash of special Ids users provide for blocks with the value being the _blockId of the object 
        classList: {}, //list of classes and an array of blockIds for each of those classes 

        //Create functions
        createBlock: function( json, callback ){}, 
        createModel: function( settings, options ){}, //create object and set settings/options  
        createView: function(model, prototype, props){}, 
        saveState: function( page, name, location, callback ){}, //savestate in old library 

        //IO functions
        getClass: function(name, callback, ctx){}, 
        loadClasses: function( classes, callback, ctx ){}, 
        loadPage: function( settings, callback ){},  //takes the state JSON and creates a page collection 
        loadPageSync: function(json){}, 

        //Utils
        getNumBlocks: function(collection){}, //find number of objects to be rendered from the collection 
        getBlockById: function(){}, 
        getBlocksByClassName: function(){}, //get array of .Panel blocks
        getBlocksByType: function(){} //get all processing objects, Threejs objects, canvas objects etc...


    };  
    return new blocks; 
})