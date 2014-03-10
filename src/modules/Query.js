define([], function(){
	return {
		//Querying functions
		//find number of objects to be rendered from the collection 
        getNumBlocks: function(collection){ 
            var numBlocks = 0; 
            (function recurse(collection){ 
                _.each(collection, function(child){ 
                    numBlocks++; 
                    if(children = (child.subcollection || child.children)) recurse(children); 
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
	}
}); 