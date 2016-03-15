var chai = require('chai');
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var spies = require('chai-spies');
var models = require('../models');
var Page = models.Page;

chai.use(spies);


describe('A test of Page models', function() {


    // describe('Page Schema', function() {
    //     xit('should have a title property', function() {

    //     });

    //     xit('Should return the current date', function() {

    //     });

    //     xit('should have an author id', function() {

    //     });
    // });

    describe('Validations', function() {

        describe('pageSchema validation', function() {
            var page;
            beforeEach(function() {
                page = new Page();
            });
            it('errors without title', function(done) {
                page.validate(function(err) {
                    expect(err.errors).to.have.property('title');
                    done();
                })
            });
            it('errors without content', function() {
                page.validate(function(err) {
                    expect(err.errors).to.have.property('content');
                    done();
                })
            });
            it('errors given an invalid status', function() {
                expect(page.status).to.not.eql('open' || 'closed');
            });
        });

        describe('Pre-Validation/Hooks', function() {
            var page;
            beforeEach(function() {
                page = new Page();
                page.title = 'ourTitle';
                page.content = 'whatever';
            });

            it('sets the Url to be set after the page is validated', function(done) {
            	var urlBeforeValidation = page.urlTitle
                page.validate(function() {
                	expect(page.urlTitle).to.not.eql(urlBeforeValidation);
                	done();
                })
            });
            xit('it should not set the url on a unvalid title', function(done) {
                page.title = null;
                console.log(page.urlTitle)
                page.validate(function(err) {
                	console.log(page.urlTitle)
                	//expect(page.urlTitle).to.be.a('string');
                	done();
                })
            });
            xit('the url should not contain any whitespaces', function() {

            });
            xit('Errors: If no title is supplied, xit generates a random one', function() {

            });
        });
    });



    describe('Virtuals', function() {
        var page;
        beforeEach(function() {
            page = new Page();
        });
        describe('route', function() {
            it('each page route should start with /wiki/', function() {
                page.urlTitle = 'routerTest'
                expect(page.route).to.eql('/wiki/routerTest');

            });

        });
        describe('renderedContent', function() {
            xit('converts markdown formatted content into html', function() {

            });
        });
    });


    describe('Page statics', function() {
        beforeEach(function(done) {
            Page.create({
                title: 'blog post',
                content: 'content for the blog post',
                tags: ['tag1', 'tag2', 'tag3']
            }, done);
        })
        afterEach(function(done) {
            Page.remove({}, done);
        });
        describe('findByTag', function() {
            it('findByTag returns all tags for page models', function(done) {
                Page.findByTag('tag1')
                    .then(function(foundPages) {
                        expect(foundPages).to.have.lengthOf(1);
                        done();
                    })
                    .then(null, done);
            });
            it('does not return any pages without the search tag', function(done) {
                Page.findByTag('blah')
                    .then(function(foundPages) {
                        expect(foundPages).to.have.lengthOf(0);
                        done();
                    })
                    .then(null, done);
            });
        });

        describe('route', function() {
            xit('checks to see if there is a user with current name', function() {

            });

        });

        describe('findOrCreate', function() {
            xit('creates a new user if not present', function() {

            });

        });
    });


    describe('Methods', function() {
        var page;
        beforeEach(function(done) {
            page = new Page();
            page.tags = ['foo', 'barzzz'];
            Page.create({
                title: 'base page',
                content: 'blahblahblah',
                tags: ['foo', 'bar', 'whatever']
            });
            Page.create({
                title: 'shared tags page',
                content: 'blahblahblah',
                tags: ['foo', 'bar', 'other']
            });
            Page.create({
                title: 'no tags shared page',
                content: 'blahblahblah',
                tags: ['almostfoo', 'almostbar', 'tag']
            });
            done();
        })
        afterEach(function(done) {
            Page.remove({}, done);
        });
        describe('findSimilar Method', function() {

            it('Finds similar tags to page tags', function() {
                page.findSimilar().then(function(pages) {
                    expect(pages).to.should.have.lengthOf(2);
                })
            });

            it('should not include the page doing the search', function() {
                page.findSimilar().then(function(pages) {
                    pages.should.not.include(page);
                })
            });

        });
    });

});