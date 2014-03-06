define([], function(){
    function load ( classes, callback, ctx ){ 
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
    }; 

	return {
		//IO functions 
        getClass: function(name, callback, ctx){ 
            var block = this; 
                load.call(block, [name], callback, ctx); 
        }, 

        //returns an array of class prototypes that were asked for 
        loadClasses: load
	}
}); 