// // var expect = require('chai').expect;
// var chai = require('chai');
// var expect = chai.expect;
// var spies = require('chai-spies');

// chai.use(spies);



// var sumFunc = function(a, b) {
// 	return a +b;
// }
// describe('math test', function() {
// 	it('should return the right sum', function() {
// 		 expect(sumFunc(2,2)).to.eql(4);
// 		//expect(2+2).to.eql(4);
// 	})
// })



// describe('Time test', function() {
// 	it('test the amount of time', function(done) {
// 		var start = new Date();

// 		setTimeout(function(){
// 			var duration = new Date() - start;
// 			expect(duration).to.be.closeTo(1000,50);
// 			done();
// 		}, 1000)
// 	})
// })

// function counter() {
// 	console.log('run');
// }

// describe('spies', function() {
// 	it('counts number of times forEach is called', function() {
// 		var counter = chai.spy(counter);
// 		var arr = [1,2,3,4];
// 		arr.forEach(function(elem) {
// 			counter();
// 		})
// 		expect(counter).to.have.been.called.exactly(arr.length);
// 	});
// });