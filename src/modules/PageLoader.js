define(['io','create', 'query'], function(io, create, query){ 
	return { 
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
                if(json.sync) io._loadPageSync.call(controller, child.settings.page); 

                //create a reference to all of the classes in the function so we can create objects
                io.loadClasses.call(controller, ['Block', 'Container', 'Page'].concat(json.classes || []), function(){

                    //create Page block 
                    create.createBlock.call(controller, json.content.blockClass || json.content.view.blockClass || 'Page', json.content || {}, function(page){ 

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
                numChildren = query.getNumBlocks.call(controller, json.content); 

            controller.renderState = _.after(numChildren, function(){ 
                controller.pages[0].view.render(); 
            }); 
            return this; 
        }, 
	}
}); 