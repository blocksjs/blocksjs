define(["../libs/childviewcontainer"], function(childviewcontainer){
	
	//console.log('CORE: ', core); 
	var BlockCollection = function(blocks){
		this._views = {};
        this._indexByModel = {};
        this._indexByCustom = {};
        this._blockIds = {}; 
        this._userBlockIds = {}; 
        this._classList = {}; 
      	this._updateLength();

      _.each(blocks, this.add, this);
	}; 
	BlockCollection.prototype = _.extend({}, Backbone.Events, childviewcontainer.prototype, {
		add: function(block){
			childviewcontainer.prototype.add.call(this, block); 
			this._set(block); 
            this.trigger('add', block); 
			return this; 
		}, 
		remove: function(block){
			childviewcontainer.prototype.remove.call(this, block); 
			var blockId = block._blockID,
                userId = block.get('blockID'), 
                classes = block.getClassAncestry(), 
                collection = this; 

            //remove _blockID
            block._blockID = blockId; 
            delete collection._blockIds[blockId]; 

            //set special user id
            if(userId){
                delete collection._userBlockIds[userId]; 
            }

            //set classes
            _.each(classes, function(className){
                var index = _.indexOf(collection._classList[className], blockId); 
                blocks._classList[className].splice(index,1); 
            }); 
            return this; 
		}, 
		_set: function(block){ 
			if(!block._blockID) blocks._set(block); 
			var blockId = block._blockID, 
                userId  = block.get('blockID'), 
                classes = block.getClassAncestry().concat(block.blockClass), 
                collection = this; 

            //set _blockID 
            collection._blockIds[blockId] = block; 

            //set special user id 
            if(userId){ 
                collection._userBlockIds[userId] = blockId; 
            } 

            //set classes 
            _.each(classes, function(className){ 
                if(className !== 'Block'){ 
                    if(!collection._classList[className]) collection._classList[className] = []; 
                    collection._classList[className].push(blockId); 
                }
            });
            return this; 
		}, 

        //return block with _blockId
        getBlockById: function(id){
            return this._blockIds[id]; 
        }, 

        //get array of .Panel blocks
        getBlocksByClassName: function(className){
            return this._classList[className]; 
        }, 

        //return block with _blockId
        getBlockByUserId: function(blockID){
            return this._userBlockIds[blockID]; 
        }
	}); 
	return BlockCollection
}); 