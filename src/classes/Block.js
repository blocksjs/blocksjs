define(['postal','backbone'], function(Postal, Backbone){
	var Block = function(options){ 
		var block = this; 

		//the following might need to be moved to the end or the beginning or something
		_.extend(block, Backbone.Events); //extend the block with Backbone events functionality
		//just in case the below overwrites the above

		//set block specific fields 
		block._blockID = (options && options._blockID)? 
			options._blockID: 
			_.uniqueId('_block'); 
		if(options && options.blockID) block.blockID = options.blockID; 
		if(options && options.parent) this.parent = options.parent; 
		// blocks._set(this); 

		//set the whitelisted variables 
		block._setWhiteList(options);

		_.defaults(block, options, _.result(this, 'defaults'));

		// _.extend(block, attributes);


/*



	move page stuff down to getpage



*/

		//blocks._set(block); 
	}; 

	Block.prototype = { 
		blockClass: 'Block', 
/*





take out view specific code make it more general.

hopefully things will magically work and no debugging is necessary

otherwise, get/set will be a viewblock thing for now




*/
		_setWhiteList: function(options){
			var block = this;
			var blacklist = []; //array of blacklisted variables in options
			var defaults = _.result(this, 'defaults');

			// console.log('THIS IS THE WHITELIST SETTER');
			// console.log('defaults');
			// console.log(defaults);

			//look through options to see if anything is already set in block
			_.each(options, function(value, key){
				console.log('current Key: ',key);
				if(key == '_blockID'){
/*					console.log('defaults:  ', defaults);
					console.log('block has:  ',_.has(block,key));
					if(defaults)
						console.log('defaults has:  ',_.has(defaults,key));
*/				}
				if(_.has(block,key) && (!defaults || !_.has(defaults,key))){
					blacklist.push(key);
				}
			});
			// console.log('blacklist');
			// console.log(blacklist);
			//_whitelist is the internal whitelist of variables that can be 
			// got and set
			var whitelistKeys = _.keys(_.defaults(_.omit(options, blacklist), defaults));
			// console.log(_.omit(options, blacklist));
			// console.log(_.defaults(_.omit(options, blacklist), defaults));


			// console.log('whitelisted keys');
			// console.log(whitelistKeys);
			block._whitelist = {};
			//turn it into an easy hashmap of whitelist keys -> true
			_.each(whitelistKeys, function(key){
				block._whitelist[key] = true;
			});
			block._whitelist.blockClass = false; //add blockClass to whitelist as false (see below for why)
			// console.log('\n\nACTUAL WHITELIST\n');
			// console.log(block._whitelist);
		},
		get: function(key){
			var block = this;
			if(!key){ //if no parameters passed in, return whitelist for everything
				return block._getAll();
			} else if(!_.has(block._whitelist, key)){ //if property isn't in the internal whitelist
				if(key == 'blockClass')
					console.log('\n\n\n\n\nBLOCK CLASS IN GET\n\n\n\n\n');
				// console.log('whitelist failure');
				// console.log(block._whitelist);
				return void 0;
			} else if(!_.has(block,key) && !_.has(Object.getPrototypeOf(block),key)){ //if property doesn't exist on the block
				return void 0;
			} else{
				return block[key]; //otherwise return property value
			}
		}, 
		_getAll: function(){
			var block = this;
			var values = {};
			_.each(block._whitelist, function(value, key){
				values[key] = block.get(key);
			});
			return values;
		},
		set: function(key, value){
			var block = this;
			if(!key){
				return void 0;
			} else if(!block._whitelist[key]){ //if key isn't set to true in the whitelist
				return void 0;
			} else if(!_.has(block,key)){ //if property doesn't exist
				return void 0;
			} else if(value === void 0){
				return false;
			} else{
				block[key] = value;
				block.trigger(key+':change');
				block.trigger('change');
				return block;
			} 
		}, 
		getID: function(){
			return this.blockID;
		},
		setID: function(newID){
			var block = this;
			if(newID === void 0)
				return false;
			else if(typeof newID !== "string" && newID !== null)
				return false;
			else {
				block.blockID = newID;
				return block;
			}
		},
		//function to return reference to Page if block is part of Page
		getPage: function(){
			var block = this;
			if(block.page)
				return this.page;
			else
				return void 0;
		},
		//function that sets the page to the current page value (using findPage)
		//and returns the page itself
		_getPage: function(){
			var block = this;
			if(blocks){ //if blocks is defined, traverse the tree
				block.page = block._findPage();
				return block.page;
			} else { //otherwise, there is no tree to traverse
				block.page = void 0;
				return void 0;
			}
		},
		//function to traverse the parent tree until it hits the page,
		//then returns said page
		_findPage: function(){
			var block = this;
			if(blocks){
				return (block.parent && child.parent.parent) ? block.parent._getPage():
						(child.parent !== blocks) ? block.parent : block; 
			} else {
				return void 0;
			}
		},
		// figure out everything that needs to be removed from the block ecosystem
		//when you are deleting a block. put that in here.
		//if it is completely insubstantial, remove this function.
		remove: function(){ 
			var block = this;
			block.clearOuts();
			block.clearIns();
			if(blocks)
				blocks._remove(block); 
		}, 

		/*






		this needs to be updated to be block general
		and not model/view specific



		if the class is block & it has a skeleton, then it is anonymous
		so that should be saved

		settings should be saved

		IO settings should be saved



		*/
		toJSON: function(){ 
			var block = this;
			var JSON = {};
			_.each(block._whitelist, function(val, key){
				JSON[key] = block[key];
			})
			if(block.blockID)
				JSON.blockID = block.blockID;

			return JSON;
		}, 
		getClassAncestry: function(){
			var block = this;
			if(block.blockClass === 'Block')
				return ['Block'];
			else{
				var ancestry = [block.blockClass];
				if(block.superClass){
					ancestry = ancestry.concat(block.super.getClassAncestry());
				}
				return ancestry;
			}
		},
		//alias for get class list above
		getClassList: function(){
			return this.getClassAncestry();
		},
		//function to set an input stream through Postal on the block
		in: function(attribute, topic, channel){
			var block = this;
			if(!attribute || !(block[attribute]) || !topic){
				return void 0;
			}
			var subscription = {
				topic: topic
			};
			if(channel)
				subscription.channel = channel;

			if(_.isFunction(block[attribute])){
				subscription.callback = block[attribute];
			} else {
				subscription.callback = function(data){
					block[attribute] = data;
				}
			}
			if(!block._ins)
				block._ins = {};
			var postalSubscription = Postal.subscribe(subscription); //save the postal subscription
			if(block._ins[attribute]){ //if attribute is set already in ins
				block._ins[attribute].push(postalSubscription)
			} else { // otherwise, create new array
				block._ins[attribute] = [postalSubscription];
			}
			return block; //make the function daisy chainable!
		},
		//function to set an output stream through Postal on the block
		//this needs to be rethought too to allow for more
		// than one channel/topic exit for each attribute
		//difficult to have multiple routes like this methinks
		out: function(attribute, topic, channel){
			// console.log('START OF OUT');
			var block = this;
			if(!attribute || !(block[attribute]) || !topic){
				return void 0;
			}
			// console.log('\n\n\n\nthis is attribute: ');
			// console.log(attribute);
			if(!block._outs)
				block._outs = {};
			if(block._outs[attribute]){ //if attribute is set already in outs
				block._outs[attribute].push(function(){
					Postal.publish({
						channel: channel,
						topic: topic,
						data: block[attribute]
					})
				});
			} else { //otherwise start the array
				block._outs[attribute] = [function(){
					Postal.publish({
						channel: channel,
						topic: topic,
						data: block[attribute]
					})}];
			}
			// _.extend(block[attribute], Backbone.Events);
			// block[attribute].on('all', block._outs[block._outs.length-1]);
			block.on(attribute+':change',block._outs[attribute][block._outs[attribute].length-1]);
			// block.listenTo(block[attribute], 'all', block._outs[block._outs.length-1]);
			return block; //make the function daisy chainable!
		},
		//clears out Postal subscriptions on an attribute
		clearIns: function(attribute){
			var block = this;
			if(attribute && !(block[attribute]))
				return void 0;
			if(attribute) //if attribute passed in
				block._clearIn(attribute);
			else{ //if no attribute, AKA remove everything
				for(var att in block._ins){
					block._clearIn(att);
				}
			}
			return block; //make the function daisy chainable!
		},
		//clears out event listeners 
		//this one needs to be rethought
		//since it currently can accidentally remove listeners
		//that were set up elsewhere (not in the out function)
		clearOuts: function(attribute){
			var block = this;
			if(attribute && !(block[attribute]))
				return void 0;
			if(attribute) //if attribute passed in
				block._clearOut(attribute);
			else{ //if no attribute, AKA remove everything
				for(var att in block._outs){
					block._clearOut(att);
				}
			}
			return block; //make the function daisy chainable!
		},
		//internal function for clearing out a single attribute input
		_clearIn: function(attribute){
			var block = this;
			if(block._ins[attribute]){
				//unsubscribe from each subscription
				for(var i = 0; i < block._ins[attribute].length; i++){
					block._ins[attribute][i].unsubscribe();
				}
				delete block._ins[attribute]; //delete entire object from memory
			}
		},
		//internal function for clearing out a single attribute output
		_clearOut: function(attribute){
			var block = this;
			if(block._outs[attribute]){
				//stop listening to each listener
				for(var i = 0; i < block._outs[attribute].length; i++){
					block.off(attribute+':change',block._outs[attribute][i]);
/*					block.on(attribute+':change', function(){
						console.log('ATTRIBUTE: ' + attribute + ' HAS BEEN CHNAGED');
					});
					block.stopListening(block[attribute], 'change', block._outs[attribute][i]);*/
				}
				delete block._outs[attribute]; //delete entire object from memory
			}
		}
	}; 
	return Block; 
});