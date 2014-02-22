var expect = require("chai").expect;
var blockClass = require("../../lib/classes/block.js"); //block class
//probably don't need blockClass here^...
var Blocks = require("../../lib/blocks.js"); // core library 

//page JSONs
var basicPageJSON = require("./testingPageBasicBlock.json");
var textPageJSON = require("./testingPageTextBlock.json");
//view JSON


//model JSON



describe("Block", function(){
	//basic block with default configurations
	var blockBasic = Blocks.createBlock('Block');
	//basic block with default configurations created as part of a page
	var basicPage = Blocks.loadPage(basicPageJSON);
	var blockBasicInPage = basicPage.getBlocksByClassName('Block');
	//text block with default configurations created as part of a page
	var textPage = Blocks.loadPage(textPageJSON);
	var blockTextInPage = basicPage.getBlocksByClassName('TextBlock');

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
		it("should return undefined if no arguments passed in", function(){
			var resultsBasic = blockBasic.get();
			var resultsPageBasic = blockBasicInPage.get();
			var resultsText = blockTextInPage.get();

			expect(resultsBasic).to.equal(void 0);
			expect(resultsPageBasic).to.equal(void 0);
			expect(resultsText).to.equal(void 0);
		});
		it("should return undefined if property doesn't exit", function(){
			var resultsBasic = blockBasic.get('jeremy');
			var resultsPageBasic = blockBasicInPage.get('jeremy');
			var resultsText = blockTextInPage.get('jeremy');

			expect(resultsBasic).to.equal(void 0);
			expect(resultsPageBasic).to.equal(void 0);
			expect(resultsText).to.equal(void 0);
		});
		it("should return the correct value if property does exist", function(){
			var resultsText = blockTextInPage.get('text');

			expect(resultsText).to.not.equal(void 0);
			expect(resultsText).to.equal('You should probably fill this with real text :)');
		});
	});

	//sets a whitelisted variable (from attributes)
	//set ( key , new value )
	describe("#set()", function(){
		it("should return undefined if you haven't passed in any parameters", function(){
			var resultsBasic = blockBasic.set();
			var resultsPageBasic = blockBasicInPage.set();
			var resultsText = blockTextInPage.set();

			expect(resultsBasic).to.equal(void 0);
			expect(resultsPageBasic).to.equal(void 0);
			expect(resultsText).to.equal(void 0);
		});
		it("should return undefined if you haven't passed in a valid key",function(){
			var resultsBasic = blockBasic.set('jeremy');
			var resultsPageBasic = blockBasicInPage.set('jeremy');
			var resultsText = blockTextInPage.set('jeremy');

			expect(resultsBasic).to.equal(void 0);
			expect(resultsPageBasic).to.equal(void 0);
			expect(resultsText).to.equal(void 0);
		});
		it("should return false if you haven't passed in a valid value to be set", function(){
			var resultsText = blockTextInPage.set('text');

			expect(resultsText).to.equal(false);
		});
		it("should return the block if everything is valid", function(){
			var result = blockTextInPage.set('text', 'shanaynay');

			expect(result).to.equal(blockTextInPage);
		});
		it("should successfully update the property that is changing if parameters are valid", function(){
			blockTextInPage.set('text', 'twiddlydiddly');

			expect(blockTextInPage.get('text')).to.equal('twiddlydiddly');
		});
		it("should return this when parameter passed in is successful", function(){
			var textResult = blockTextInPage.set('text','NinaFace');

			expect(textResult).to.equal(blockTextInPage);
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

	//returns the block's whitelisted variables + classname
	//in the json format
	describe("#toJSON()", function(){
		it("should return solely the className if the Block has no extra model or view data", function(){
			//check for both standard Block and something that extends it
			var resultsBasic = blockBasic.toJSON();
			var resultsPageBasic = blockBasicInPage.toJSON();

			expect(resultsBasic).to.equal({className:'Block'});
			expect(resultsPageBasic).to.equal({className:'Block'});
		});
		it("should return the user set blockID if a user has set an ID", function(){
			blockBasic.setID()
		});
		it("should return the model data if model is set", function(){

		});
		it("should return the updated model data if model is set and then updated dynamically", function(){

		});
		it("should return the view data if extra view data is passed in via json settings", function(){
			textPage = Blocks.loadPage(textPageJSON);
			blockTextInPage = basicPage.getBlocksByClassName('TextBlock');

			var resultsText = blockTextInPage.toJSON();

			expect(resultsText).to.equal({className:'TextBlock', text:'herro', type:'p'});
		});
		it("should return the updated view data if extra view attributes are added or updated dynamically", function(){
			blockTextInPage.set('text', 'herro');
			var resultsText = blockTextInPage.toJSON();

			expect(resultsText).to.equal({className:'TextBlock', text:'You should probably fill this with real text :)', type:'p'});
		});
	});

	//function to set user generated blockID
	describe("#setID()",function(){
		it("should return false if no ID is passed in",function(){
			expect(blockBasic.setID()).to.equal(false);
			expect(blockTextInPage.setID()).to.equal(false);
		});
		it("should return false if the ID passed in is not a valid string",function(){
			expect(blockBasic.setID(function(){var x = 9; var y = x+7;})).to.equal(false);
			expect(blockTextInPage.setID({traffic:'wow',jeremy:'lin'})).to.equal(false);
		});
		it("should change the blockID if the parameter passed in is valid", function(){
			blockBasic.setID('JeremyLin');
			expect(blockBasic.getID()).to.equal('JeremyLin');
		});
		it("should not change the blockID if the paramter passed in is invalid", function(){
			blockBasic.setID('JeremyLin');
			blockTextInPage.setID('LinJeremy');
			blockBasic.setID(function(){var x = 9; var y = x+7;});
			blockTextInPage.setID({traffic:'wow',jeremy:'lin'});

			expect(blockBasic.getID()).to.equal('JeremyLin');
			expect(blockTextInPage.getID()).to.equal('LinJeremy');
		});
		it("should return this when parameter passed in is successful", function(){
			var blockResult = blockBasic.setID('TwinkleTwinkle');
			var textResult = blockTextInPage.setID('NinaFace');

			expect(blockResult).to.equal(blockBasic);
			expect(textResult).to.equal(blockTextInPage);
		});
	});

	//initializes the object
	describe("#initialize()", function(){
		it("should rerender every time the model object changes", function(){

		});
		// should there be the following test?
		it("should completely remove itself if it's model is deleted", function(){

		});
	});

	//renders the object
	describe("render()", function(){

	});

	//removes the object and all variable references/event listeners therewithin
	describe("#remove()", function(){
		it("should remove all attributes from memory", function(){

		});
		it("should unsubscribe from all event & stream channels", function(){

		});
		it("should not exist after remove is finished running", function(){

		});
	});

	//should the next two be in here?

	//convenience function to subscribe block to a channel
	describe("#subscribe()", function(){

	});

	//convenience function to unsubscribe block from a channel
	describe("#unsubscribe()", function(){

	});

	//returns an array of ancestors (className) from most recent to Block
	describe("#getClassAncestry()", function(){
		it("should return null for the base block class", function(){
			var resultsBasic = blockBasic.getClassAncestry();
			var resultsPageBasic = blockBasicInPage.getClassAncestry();

			expect(resultsBasic).to.equal(null);
			expect(resultsPageBasic).to.equal(null);
		});
		it("should return container then block for the page class", function(){
			var basicPageResults = basicPage.getClassAncestry();
			var textPageResults = textPage.getClassAncestry();

			expect(basicPageResults).to.equal(['Container', 'Block']);
			expect(textPageResults).to.equal(['Container', 'Block']);
		});
		it("should return block for the textblock class", function(){
			var resultsText = blockTextInPage.getClassAncestry();

			expect(resultsText).to.equal(['Block']);
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