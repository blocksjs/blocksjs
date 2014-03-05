require.config({ 
  baseUrl:'../../../src2/classes', 
  waitSeconds: 10, 
  paths : {
    text : '../requirePlugins/text', //text plugin
    json : '../requirePlugins/json' //json plugin
  },
  packages: [
    {
      name: 'core', 
      location: '../', 
      main:"core"
    }, 
    {
      name: 'jquery', 
      location: 'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3', 
      main:"jquery.min"
    }, 
    {
      name: 'underscore', 
      location: '../libs', 
      main:'underscore-min'
    }, 
    {
      name: 'backbone', 
      location: '../libs', 
      main:'backbone-min'
    }, 
    {
      name: 'less', 
      location: '../libs', 
      main:'less'
    },
    {
      name: 'postal',
      location: '../libs',
      main: 'postal'
    },
    {
      name: 'postal.when',
      location: '../libs',
      main: 'postal.when'
    },
    {
      name: 'mocha',
      location: '../libs',
      main: 'mocha'
    },
    { 
      name: 'chai', 
      location: '../libs', 
      main: 'chai' 
    }, 
    { 
      name: 'chai-jquery', 
      location: '../libs', 
      main: 'chai-jquery' 
    }, 
    {
    	name:'Block',
    	location:'./',
    	main:'Block'
    },
    {
    	name:'TextBlock',
    	location:'./',
    	main:'TextBlock'
    },
    {
    	name:'Container',
    	location:'./',
    	main:'Container'
	},
    {
    	name:'Page',
    	location:'./',
    	main:'Page'
    }

  ] 
}); 
var requireArray = ['core','postal','Block','TextBlock','Container','Page', 'chai'];
requireArray.push('json!../../tests/classes/block/testingPageBasicBlock.json');
requireArray.push('json!../../tests/classes/block/testingPageTextBlock.json');
requireArray.push('mocha');

require(requireArray, function(Blocks, Postal, blockClass, textBlockClass, containerClass, pageClass, chai, basicPageJSON, textPageJSON){ 
  var expect = chai.expect; 
  mocha.setup('bdd'); 

	//view JSON


	//model JSON



	describe("Block", function(){

		console.log(Blocks);
		//basic block with default configurations
		var blockBasic = new blockClass(); //Blocks.createBlock({});
		console.log(blockBasic);
		//basic block with default configurations created as part of a page
		var basicPage = {};//Blocks.loadPage(basicPageJSON);
		var blockBasicInPage = {};//basicPage.getBlocksByClassName('Block');
		//text block with default configurations created as part of a page
		var textPage = {};//Blocks.loadPage(textPageJSON);
		var blockTextInPage = {};//basicPage.getBlocksByClassName('TextBlock');

		var blockText = new textBlockClass();
		console.log(blockText.get());
		console.log('FIRST MAJR');

		//block with view config but no model
		var blockView;
		//block with model config but no view
		var blockModel;
		//block with both model & view configs
		var blockViewModel;

		//block with view config but no model created as part of a page
		var blockViewInPage;
		//block with model config but no view created as part of a page
		var blockModelInPage;
		//block with both model & view configs created as part of a page
		var blockViewModelInPage;



		//gets a whitelisted variable (from attributes)
		describe("#get()", function(){
			it("should return entire attribute list if no arguments passed in", function(){
				var resultsBasic = blockBasic.get();
				// var resultsPageBasic = blockBasicInPage.get();
				// var resultsText = blockTextInPage.get();
				var resultsText = blockText.get();

				expect(_.isEmpty(resultsBasic)).to.equal(_.isEmpty({}));
				// expect(resultsPageBasic).to.equal(void 0);
				expect(JSON.stringify(resultsText)).to.equal(JSON.stringify({text:'You should probably fill this with real text :)'}));
			});
			it("should return undefined if property doesn't exit", function(){
				var resultsBasic = blockBasic.get('jeremy');
				// var resultsPageBasic = blockBasicInPage.get('jeremy');
				// var resultsText = blockTextInPage.get('jeremy');
				var resultsText = blockText.get('jeremy');

				expect(resultsBasic).to.equal(void 0);
				// expect(resultsPageBasic).to.equal(void 0);
				expect(resultsText).to.equal(void 0);
			});
			it("should return the correct value if property does exist", function(){
				// var resultsText = blockTextInPage.get('text');
				var resultsText = blockText.get('text');

				//expect(resultsText).to.not.equal(void 0);
				expect(resultsText).to.equal('You should probably fill this with real text :)');
			});
		});

		//sets a whitelisted variable (from attributes)
		//set ( key , new value )
		describe("#set()", function(){
			it("should return undefined if you haven't passed in any parameters", function(){
				var resultsBasic = blockBasic.set();
				// var resultsPageBasic = blockBasicInPage.set();
				// var resultsText = blockTextInPage.set();
				var resultsText = blockText.set();

				expect(resultsBasic).to.equal(void 0);
				// expect(resultsPageBasic).to.equal(void 0);
				expect(resultsText).to.equal(void 0);
			});
			it("should return undefined if you haven't passed in a valid key",function(){
				var resultsBasic = blockBasic.set('jeremy');
				// var resultsPageBasic = blockBasicInPage.set('jeremy');
				// var resultsText = blockTextInPage.set('jeremy');
				var resultsText = blockText.set('jeremy');

				expect(resultsBasic).to.equal(void 0);
				// expect(resultsPageBasic).to.equal(void 0);
				expect(resultsText).to.equal(void 0);
			});
			it("should return false if you haven't passed in a valid value to be set", function(){
				// var resultsText = blockTextInPage.set('text');
				var resultsText = blockText.set('text');

				expect(resultsText).to.equal(false);
			});
			it("should return the block if everything is valid", function(){
				// var result = blockTextInPage.set('text', 'shanaynay');
				var resultText = blockText.set('text', 'shanaynay');

				// expect(result).to.equal(blockTextInPage);
				expect(resultText).to.equal(blockText);
			});
			it("should successfully update the property that is changing if parameters are valid", function(){
				// blockTextInPage.set('text', 'twiddlydiddly');
				blockText.set('text','shanaynay');

				// expect(blockTextInPage.get('text')).to.equal('twiddlydiddly');				
				expect(blockText.get('text')).to.equal('shanaynay');
			});
		});

		//function to set user generated blockID
		describe("#setID()",function(){
			it("should return false if no ID is passed in",function(){
				expect(blockBasic.setID()).to.equal(false);
				// expect(blockTextInPage.setID()).to.equal(false);
				expect(blockText.setID()).to.equal(false);
			});
			it("should return false if the ID passed in is not a valid string",function(){
				expect(blockBasic.setID(function(){var x = 9; var y = x+7;})).to.equal(false);
				// expect(blockTextInPage.setID({traffic:'wow',jeremy:'lin'})).to.equal(false);
				expect(blockText.setID({traffic:'wow',jeremy:'lin'})).to.equal(false);
			});
			it("should set ID to null if null is passed in as the ID", function(){
				blockBasic.setID('magic');
				blockBasic.setID(null);

				expect(blockBasic.getID()).to.equal(null);
			});
			it("should change the blockID if the parameter passed in is valid", function(){
				blockBasic.setID('JeremyLin');
				expect(blockBasic.getID()).to.equal('JeremyLin');
			});
			it("should not change the blockID if the paramter passed in is invalid", function(){
				blockBasic.setID('JeremyLin');
				// blockTextInPage.setID('LinJeremy');
				blockText.setID('LinJeremy');
				blockBasic.setID(function(){var x = 9; var y = x+7;});
				// blockTextInPage.setID({traffic:'wow',jeremy:'lin'});
				blockText.setID({traffic:'wow',jeremy:'lin'});

				expect(blockBasic.getID()).to.equal('JeremyLin');
				expect(blockText.getID()).to.equal('LinJeremy');
			});
			it("should return this when parameter passed in is successful", function(){
				var blockResult = blockBasic.setID('TwinkleTwinkle');
				// var textResult = blockTextInPage.setID('NinaFace');
				var textResult = blockText.setID('NinaFace');

				expect(blockResult).to.equal(blockBasic);
				expect(textResult).to.equal(blockText);
			});
		});

		//function to get user generated blockID
		describe("#getID()",function(){
			it("should return null if no ID has been set", function(){
				blockBasic = new blockClass;

				expect(blockBasic.getID()).to.equal(null);
			});
			it("should return the ID if an ID has been set", function(){
				blockBasic.setID('Transistor');

				expect(blockBasic.getID()).to.equal('Transistor');
			});
		});

		//returns the block's whitelisted variables + classname
		//in the json format
		describe("#toJSON()", function(){
			it("should return solely the className if the Block has no extra model or view data", function(){
				//check for both standard Block and something that extends it
				blockBasic = new blockClass();
				var resultsBasic = blockBasic.toJSON();
				// var resultsPageBasic = blockBasicInPage.toJSON();

				expect(JSON.stringify(resultsBasic)).to.equal(JSON.stringify({blockClass:'Block'}));
				// expect(resultsPageBasic).to.equal({className:'Block'});
			});
			it("should return the user set blockID if a user has set an ID", function(){
				blockBasic.setID('magicalmoment');

				expect(JSON.stringify(blockBasic.toJSON())).to.equal(JSON.stringify({blockClass:'Block',blockID:'magicalmoment'}));
			});
			it("should return the view attributes if they come set", function(){
				blockText = undefined;
				blockText = new textBlockClass();
				var newResultsText = blockText.toJSON();

				console.log(blockText.get());
				console.log('THIS IS THE GET');

				expect(JSON.stringify(newResultsText)).to.equal(JSON.stringify({blockClass:'TextBlock', attributes:{text:'You should probably fill this with real text :)'}}));
			});
			it("should return the model data if model is set", function(){
				expect(false).to.equal(true);
			});
			it("should return the updated model data if model is set and then updated dynamically", function(){
				expect(false).to.equal(true);
			});
			it("should return the view data if extra view data is passed in via json settings", function(){
				expect(false).to.equal(true);
				textPage = Blocks.loadPage(textPageJSON);
				blockTextInPage = basicPage.getBlocksByClassName('TextBlock');

				var resultsText = blockTextInPage.toJSON();

				expect(resultsText).to.equal({className:'TextBlock', text:'herro', type:'p'});
			});
			it("should return the updated view data if extra view attributes are added or updated dynamically", function(){
				blockText = new textBlockClass();
				blockText.set('text', 'herro');
				var resultsText = blockText.toJSON();

				expect(JSON.stringify(resultsText)).to.equal(JSON.stringify({blockClass:'TextBlock', attributes:{text:'herro'}}));
				// blockTextInPage.set('text', 'herro');
				// var resultsText = blockTextInPage.toJSON();

				// expect(resultsText).to.equal({className:'TextBlock', text:'You should probably fill this with real text :)', type:'p'});
			});
		});
/*
		//initializes the object
		describe("#initialize()", function(){
			it("should set attributes if attributes are passed in as a hash", function(){
			//hash cannot use the following keys: model, collection, el, id, className, tagName, attributes and events
				var hash = {'magic':'tragic','tragic':'bronson','number':10};
				var newBlock = new blockClass(hash);

				expect(JSON.stringify(newBlock.get())).to.equal(JSON.stringify(hash));
			});
			it("should create an internal _blockID",function(){
				
			});
		});

		//renders the object
		describe("#render()", function(){

		});
*/
		//removes the object and all variable references/event listeners therewithin
		describe("#remove()", function(){
			it("should remove all attributes from memory", function(){

			});
			it("should unsubscribe from all event & stream channels", function(){

			});
			it("should not exist after remove is finished running", function(){

			});
		});

		//returns an array of ancestors (className) from most recent to Block
		describe("#getClassAncestry()", function(){
			it("should return null for the base block class", function(){
				var resultsBasic = blockBasic.getClassAncestry();
				// var resultsPageBasic = blockBasicInPage.getClassAncestry();

				expect(resultsBasic).to.equal(null);
				// expect(resultsPageBasic).to.equal(null);
			});
			it("should return container then block for the page class", function(){
				// var basicPageResults = basicPage.getClassAncestry();
				// var textPageResults = textPage.getClassAncestry();
				var testPage = new pageClass;
				var resultsPage = testPage.getClassAncestry();

				expect(resultsPage.toString()).to.equal(['Container','Block'].toString());
				// expect(basicPageResults).to.equal(['Container', 'Block']);
				// expect(textPageResults).to.equal(['Container', 'Block']);
			});
			it("should return block for the classes that directly extend Block", function(){
				// var resultsText = blockTextInPage.getClassAncestry();
				var resultsText = blockText.getClassAncestry();
				
				var testContainer = new containerClass;
				var resultsContainer = testContainer.getClassAncestry();

				expect(resultsContainer.toString()).to.equal(['Block'].toString());
				expect(resultsText.toString()).to.equal(['Block'].toString());
			});
		});

		//gets the page this block is a part of
		describe("#getPage()", function(){
			it("should return a reference to the page if the block is part of a page", function(){
				var resultsPageBasic = blockBasicInPage.getPage();
				var resultsText = blockTextInPage.getPage();

				expect(resultsPageBasic).to.equal(basicPage);
				expect(resultsText).to.equal(textPage);
			});
			it("should return undefined if the block is not part of a page", function(){
				var resultsBasic = blockBasic.getPage();

				expect(resultsBasic).to.equal(void 0);
			});
		});

		//a convenience function to create subscriptions
		describe("#in(attribute, topic, channel)", function(){
			blockBasic = new blockClass();
			blockBasic.magic = blockBasic.tragic = blockBasic.dragic = 7;
			blockBasic.jeremy = function(data){
				blockBasic.lin = data;
			}
			blockBasic.ins = {
				magic: true,
				tragic: true,
				dragic: true
			};

			it("should return undefined if attribute isn't passed in", function(){
				expect(blockBasic.in()).to.equal(void 0);
			});
			it("should return undefined if attribute doesn't exist in block", function(){
				expect(blockBasic.in('shanaynaybadoooo')).to.equal(void 0);
			});
			it("should return undefined if topic isn't passed in", function(){
//NEED TO FIX THIS TOO	
	//maybe not anymore
				//may need to change 'blockID' to something else
				expect(blockBasic.in('magic')).to.equal(void 0);
			});
			it("should return false if the attribute is not a white listed variable in block", function(){
// NEED TO FIX THIS SO THAT IT'S WHITE LISTED
	//maybe not anymore
				expect(blockBasic.in('blockClass', 'topic')).to.equal(false);
			});
			it("should create a subscription on the topic to change the attribute with incoming data if the attribute is a non-function in block", function(){
				blockBasic.in('magic', 'topic');
				Postal.publish({
					topic: 'topic',
					data: 'shmata'
				});
				//perhaps might need to set timeout here
				expect(blockBasic.magic).to.equal('shmata');
			});
			it("should create a subscription on the topic to call the attribute in block if it is a function in block", function(){
				blockBasic.in('jeremy', 'topic');
				Postal.publish({
					topic:'topic',
					data: 'linning!'
				});
				//perhaps might need to TIMEOUT
				expect(blockBasic.lin).to.equal('linning!');
			});
			it("should do the same as the above two tests, but set a channel as well, if a channel is passed in", function(){
				blockBasic.in('magic', 'topic', 'STRATEGY');
				Postal.publish({
					channel: 'STRATEGY',
					topic: 'topic',
					data: 'batata'
				});

				blockBasic.in('jeremy', 'topic', 'TRIII');
				Postal.publish({
					channel: 'TRIII',
					topic: 'topic',
					data: 'shmatata'
				});
				//perhaps might need to set timeout here
				expect(blockBasic.magic).to.equal('batata');
				expect(blockBasic.lin).to.equal('shmatata');
			});
			it("should set a new array (keyed with attribute) on the internal _ins object in block if this attribute doesn't have any subscriptions yet", function(){
				expect(blockBasic._ins.dragic).to.equal(void 0);
				blockBasic.in('dragic', 'shloof');
				expect(blockBasic._ins.dragic).length(1);
			});
			it("should push a new object onto the array (keyed with attribute) on the internal _ins object in block if this attribute already has subscriptions", function(){
				expect(blockBasic._ins.tragic).to.equal(void 0);
				blockBasic.in('tragic','distance');
				blockBasic.in('tragic','magic');
				blockBasic.in('tragic', 'aloof.three', 'ofSparta');
				expect(blockBasic._ins.tragic).length(3);
			});
			it("should return the block so that it can be daisy chained with more functions", function(){
				expect(blockBasic.in('tragic','herro','berro')).to.equal(blockBasic);
			});
			//do we want the following? for now not implemented
			it("should set the attribute passed in as a function on the callback of the subscription IF the attribute is an anonymous function", function(){

			});
		});

		//a convenience function to create publishers that publish on attribute changes
		describe("#out(attribute, topic, channel", function(){
			blockBasic = new blockClass();
			blockBasic.magic = blockBasic.tragic = blockBasic.dragic = 7;
			blockBasic.outs = {
				magic: true,
				tragic: true,
				dragic: true
			};
			it("should return undefined if attribute isn't passed in", function(){
				expect(blockBasic.out()).to.equal(void 0);
			});
			it("should return undefined if attribute doesn't exist in block", function(){
				expect(blockBasic.out('jernodmmdm')).to.equal(void 0);
			});
			it("should return undefined if topic isn't passed in", function(){
				expect(blockBasic.out('magic')).to.equal(void 0);
			});
			it("should return false if the attribute is not a white listed variable in block", function(){
				expect(blockBasic.out('blockClass', 'herro')).to.equal(false);
			});
			it("should listen to the attribute passed in, publishing any changes on the topic passed in", function(){
				blockBasic.out('magic','topic');
				var booltime = false;
				Postal.subscribe({
					topic: 'topic',
					callback: function(data){
						booltime = data;
					}
				});
				blockBasic.magic = 'triangle';
				//might need more time
				expect(booltime).to.equal('triangle');
			});
			it("should listen to the attribute passed in, publishing any changes on the topic & channel passed in (if channel also passed)", function(){
				blockBasic.out('magic','topic','chancy');
				var booltime = false;
				Postal.subscribe({
					channel: 'chancy',
					topic: 'topic',
					callback: function(data){
						booltime = data*2;
					}
				});
				blockBasic.magic = 4;
				//might need more time
				expect(booltime).to.equal(8);
			});
			it("should set a new array (keyed with attribute) on the internal _outs object in block if this attribute doesn't have any subscriptions yet (with the callback for listenTo)", function(){
				expect(blockBasic._outs.dragic).to.equal(void 0);
				blockBasic.out('dragic', 'shloof');
				expect(blockBasic._outs.dragic).length(1);
			});
			it("should push a new callback for listenTo onto the array (keyed with attribute) on the internal _outs object in block if this attribute already has subscriptions", function(){
				expect(blockBasic._outs.tragic).to.equal(void 0);
				blockBasic.out('tragic', 'shloof');
				blockBasic.out('tragic', 'droof', 'gjagag');
				blockBasic.out('tragic', 'gjgjgjs', 'sleep');
				expect(blockBasic._outs.tragic).length(3);
			});			
			it("should return the block so that it can be daisy chained with more functions", function(){
				expect(blockBasic.out('tragic','herro','berro')).to.equal(blockBasic);
			});
		});

		//a convenience function to clear all subscriptions on an attribute
		describe("#clearIns(attribute)", function(){
			blockBasic = new blockClass();
			blockBasic.magic = blockBasic.tragic = blockBasic.dragic = 7;
			blockBasic.ins = {
				magic: true,
				tragic: true,
				dragic: true
			};
			blockBasic.in('magic','tragic');
			blockBasic.in('tragic', 'topic', 'channel');

			it("should return undefined if attribute is passed in and it doesn't exist in block", function(){
				expect(blockBasic.clearIns('stagbb')).to.equal(void 0);
			});
			it("should do nothing if a valid attribute is passed in that hasn't had any subscriptions created for it", function(){
				var savedState = blockBasic._ins.toString();
				blockBasic.clearIns('dragic');
				expect(blockBasic._ins.toString()).to.equal(savedState);
			});
			it("should unsubscribe from all the subscriptions in _ins if a valid attribute is passed in for which subscriptions exist", function(){
				blockBasic.in('magic', 'topic');
				blockBasic.in('magic', 'otherTopic', 'channel');
				blockBasic.clearIns('magic');
				Postal.publish({
					topic: 'topic',
					data: 'seventy'
				});
				Postal.publish({
					channel: 'channel',
					topic: 'otherTopic',
					data: 'seventy'
				});
				expect(blockBasic.magic).to.not.equal('seventy');
			});
			it("should delete the array for the attribute passed if an array previously existed within _ins", function(){
				blockBasic.in('magic', 'topic');
				blockBasic.in('magic', 'otherTopic', 'channel');
				blockBasic.clearIns('magic');
				expect(blockBasic._ins).to.be.empty;
			});
			it("should unsubscribe from all subscriptions in _ins if no attributes passed in", function(){
				blockBasic.in('magic', 'topic');
				blockBasic.in('magic', 'otherTopic', 'channel');
				blockBasic.in('dragic', 'topic');
				blockBasic.in('dragic', 'otherTopic', 'channel');
				blockBasic.in('tragic', 'topic');
				blockBasic.in('tragic', 'otherTopic', 'channel');
				blockBasic.clearIns();
				Postal.publish({
					topic: 'topic',
					data: 'seventy'
				});
				Postal.publish({
					channel: 'channel',
					topic: 'otherTopic',
					data: 'seventy'
				});
				expect(blockBasic.magic).to.not.equal('seventy');				
				expect(blockBasic.tragic).to.not.equal('seventy');				
				expect(blockBasic.dragic).to.not.equal('seventy');				
			});
			it("should have an empty object for _ins after after clearIns is called without an attribute", function(){
				blockBasic.in('magic', 'topic');
				blockBasic.in('magic', 'otherTopic', 'channel');
				blockBasic.in('dragic', 'topic');
				blockBasic.in('dragic', 'otherTopic', 'channel');
				blockBasic.in('tragic', 'topic');
				blockBasic.in('tragic', 'otherTopic', 'channel');
				blockBasic.clearIns();
				expect(blockBasic._ins).to.be.empty;				
			});
			it("should return the block so that DAISY CHAINING!!!", function(){
				expect(blockBasic.clearIns()).to.equal(blockBasic);
			});
		})

		//a convenience function to clear all listeners on an attribute that publish a message
		describe("#clearOuts(attribute)", function(){
			blockBasic = new blockClass();
			blockBasic.magic = blockBasic.tragic = blockBasic.dragic = 7;
			blockBasic.outs = {
				magic: true,
				tragic: true,
				dragic: true
			};
			blockBasic.out('magic','tragic');
			blockBasic.out('tragic', 'topic', 'channel');

			it("should return undefined if attribute is passed in and it doesn't exist in block", function(){
				expect(blockBasic.clearOuts('JDJDJDJ')).to.equal(void 0);
			});
			it("should do nothing if a valid attribute is passed in that hasn't had any listener/publishers created for it", function(){
				var savedState = blockBasic._outs.toString();
				blockBasic.clearOuts('dragic');
				expect(blockBasic._outs.toString()).to.equal(savedState);
			});
			it("should stop listening to all listeners using callbacks for an attribute in _outs if a valid attribute is passed in for which listeners exist", function(){
				blockBasic.out('tragic', 'topic');
				blockBasic.out('tragic', 'shmopic','hello');
				var shmoop = 'doop';
				Postal.subscribe({
					topic: 'topic',
					callback: function(data){
						shmoop = data;
					}
				});
				Postal.subscribe({
					channel: 'hello',
					topic: 'shmopic',
					callback: function(data){
						shmoop = data;
					}
				});
				blockBasic.clearOuts('tragic');
				blockBasic.tragic = 'face';
				expect(shmoop).to.equal('doop');
			});
			it("should delete the array for the attribute passed if an array previously existed within _outs", function(){
				blockBasic.out('tragic', 'topic');
				blockBasic.out('tragic', 'shmopic','hello');
				blockBasic.clearOuts('tragic');
				expect(blockBasic._outs.tragic).to.equal(void 0);
			});
			it("should stop listening to all listeners in _outs if no attributes passed in", function(){
				blockBasic.out('tragic', 'topic');
				blockBasic.out('tragic', 'shmopic','hello');
				blockBasic.out('magic', 'topic');
				blockBasic.out('magic', 'shmopic','hello');
				blockBasic.out('dragic', 'topic');
				blockBasic.out('dragic', 'shmopic','hello');
				var shmoop = 'doop';
				Postal.subscribe({
					topic: 'topic',
					callback: function(data){
						shmoop = data;
					}
				});
				Postal.subscribe({
					channel: 'hello',
					topic: 'shmopic',
					callback: function(data){
						shmoop = data;
					}
				});
				blockBasic.clearOuts();
				blockBasic.tragic = 'face';
				expect(shmoop).to.equal('doop');
			});
			it("should have an empty object for _outs after after clearOuts is called without an attribute", function(){
				blockBasic.out('tragic', 'topic');
				blockBasic.out('tragic', 'shmopic','hello');
				blockBasic.out('magic', 'topic');
				blockBasic.out('magic', 'shmopic','hello');
				blockBasic.out('dragic', 'topic');
				blockBasic.out('dragic', 'shmopic','hello');
				blockBasic.clearOuts();
				expect(blockBasic._outs).to.be.empty;
			});
			it("should return the block so that DAISY CHAINING!!!", function(){
				expect(blockBasic.clearOuts()).to.equal(blockBasic);
			});
		});

		//internal clear for singular attribute in
		describe("#_clearIn(attribute)", function(){
			blockBasic = new blockClass();
			blockBasic.magic = blockBasic.tragic = blockBasic.dragic = 7;
			blockBasic.ins = {
				magic: true,
				tragic: true,
				dragic: true
			};
			blockBasic.in('magic','tragic');
			blockBasic.in('tragic', 'topic', 'channel');

			it("should unsubscribe from all the subscriptions in _ins for attribute", function(){
				blockBasic.in('magic','tragic','hello');
				blockBasic.magic = 'KROKODOLO';
				blockBasic._clearIn('magic');
				Postal.publish({
					channel: 'hello',
					topic: 'tragic',
					data: 'shmata'
				});
				Postal.publish({
					topic: 'tragic',
					data: 'shmata'
				});
				expect(blockBasic.magic).to.equal('KROKODOLO');
			});
			it("should delete the array for the attribute passed in in _ins", function(){
				blockBasic.in('tragic','tragic');
				blockBasic._clearIn('tragic');
				expect(blockBasic._ins.tragic).to.equal(void 0);
			});
		});

		//internal clear for singular attribute out
		describe("#_clearOut(attribute)", function(){
			blockBasic = new blockClass();
			blockBasic.magic = blockBasic.tragic = blockBasic.dragic = 7;
			blockBasic.outs = {
				magic: true,
				tragic: true,
				dragic: true
			};
			blockBasic.out('magic','tragic');
			blockBasic.out('tragic', 'topic', 'channel');

			it("should stop listening to all listeners using callbacks for the attribute in _outs", function(){
				blockBasic.out('magic','tragic','hello');
				var beats = 'beats';

				Postal.subscribe({
					topic: 'tragic',
					callback: function(data){
						beats = data;
					}
				});
				Postal.subscribe({
					channel: 'hello',
					topic: 'tragic',
					callback: function(data){
						beats = data;
					}
				});
				blockBasic._clearOut('magic');
				blockBasic.magic = 'squareface';
				expect(beats).to.equal('beats');
			});
			it("should delete the array for the attribute passed in in _outs", function(){
				blockBasic.out('tragic','tragic');
				blockBasic._clearOut('tragic');
				expect(blockBasic._outs.tragic).to.equal(void 0);
			});
		});


		/// still need checks for: 
		/*

			blockClass

			blockID stuff

			internal _blockID stuff

			super stuff

			environmentType (though i think this should not exist - will talk to lerenzo)

			this.model



		*/

	});
	mocha.run();
});