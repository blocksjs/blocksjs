var expect = require('chai').expect; 
var livepage = require('../livepage-module.js'); 

describe("livepage", function(){
	
   	describe("state", function(){
       it("should have state and pageId", function(){
       		var lp = new livepage({
       			state: {
       				'somethin': 'oh heeeey', 
       				'oh hey': 'yup'
       			}, 
       			pageId: 'owrj320'
       		}); 
 
           expect(lp).to.have.a.property("state");
           expect(lp).to.have.a.property("pageId", "owrj320");
       });
   	});

   	describe(".getState()", function(){
   		it('should return a state object that is equal to the state', function(){
   			var lp = new livepage({
       			state: {
       				'somethin': 'oh heeeey', 
       				'oh hey': 'yup'
       			}, 
       			pageId: 'owrj320'
       		}); 
       		expect(lp.getState()).to.deep.equal(lp.state); 
   		})
   	})
});