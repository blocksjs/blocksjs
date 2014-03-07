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

		//extend whitelisted attributes from defaults with user options 
/*		var attrs = _.omit(options,['_blockID','blockID','model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events', 'parent', 'blockClass']); 
		var attributes = _.defaults({}, attrs, _.result(this, 'defaults')); 
*/
		_.defaults(block, options, _.result(this, 'defaults'));

		// _.extend(block, attributes);


/*



	move page stuff down to getpage



*/



		//parent page 
		block.page =(function findPage(child){ 
			return 	(child.parent && child.parent.parent)? findPage(child.parent): 
					(child.parent !== blocks)? child.parent: 
					child; 
		})(block); 

		//tell blocksjs that this exists
		if(window.blocks) window.blocks._set(block); 
	}; 

	Block.prototype = { 
		blockClass: 'Block', 
/*




make it so in/out creates an _ins and _outs if it's not created yet







take out view specific code make it more general.

hopefully things will magically work and no debugging is necessary

otherwise, get/set will be a viewblock thing for now




*/
		get: function(key){
			var block = this;
			if(!key){ //if no parameters passed in
				return block;
			} else if(!block.hasOwnProperty(key)){ //if property doesn't exist
				return void 0;
			} else{
				return block[key]; //otherwise return property value
			}
		}, 
		set: function(key, value){
			var block = this;
			if(!key){
				return void 0;
			} else if(!block.hasOwnProperty(key)){ //if property doesn't exist
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
			//must add search functionality to ensure page is still valid
			if(this.page)
				return this.page;
			else
				return void 0;
		},

		// figure out everything that needs to be removed from the block ecosystem
		//when you are deleting a block. put that in here.
		//if it is completely insubstantial, remove this function.
		remove: function(){ 
			if(blocks)
				blocks._remove(this); 
		}, 

		/*






		this needs to be updated to be block general
		and not model/view specific



		if the class is block & it has a skeleton, then it is anonymous
		so that should be saved

		settings should be saved

		IO settings should be saved



		*/
		saveState: function(){ 
			var state, arr; 
			state = {}; 

			//set model and view 
			state.view = this.toJSON(); 
			state.model = this.model.toJSON(); 

			return state; 
		}, 
		/*


update this so that it returns block and doesn't ignore that



		*/
		getClassAncestry: function(){
			var block = this;
			if(block.blockClass === 'Block')
				return [];
			else{
				var ancestry = [block.superClass];
				if(block.superClass !== 'Block'){
					ancestry = ancestry.concat(block.super.getClassAncestry());
				}
				return ancestry;
			}
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