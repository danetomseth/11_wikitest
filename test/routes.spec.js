var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
var models = require('../models');
var Page = models.Page;



describe('Routes', function() {
    beforeEach(function(done) {
        Page.remove({}, done);

    });
    afterEach(function(done) {
        Page.remove({}, done);
    });
    describe('GET routes', function() {


        it('/ responds with 200', function() {
            return agent
                .get('/')
                .expect(200)

        });
        it('should return 404 on invalid url', function() {
            return agent
                .get('/jhdsbc')
                .expect(404)

        });
        it('/add responds with 200 & adds a page', function() {
            return agent
                .get('/wiki/add')
                .expect('Content-Type', 'text/html; charset=utf-8')
                .expect(200)
        })
        it('/search responds with 200', function() {
            return agent
                .get('/wiki/search?search=tag1')
                .expect('Content-Type', 'text/html; charset=utf-8')
                .expect(200)

        })
        it('responds with 200 when visiting page url', function() {
            Page.create({
                title: 'ourTitle',
                content: 'whatever'
            });
            return agent
                .get('/wiki/ourTitle')
                .expect(200)
        })
    });

    describe('POST routes', function() {
        it('/ responds with 302 & adds a new page with corrent content', function(done) {
            agent
                .post('/wiki')
                .send({
                    title: 'Our new post',
                    content: 'Content for our new post',
                    name: 'Me',
                    email: 'Me@me.com',
                    tags: 'aTag'
                })
                .expect(302)
                .end(function(err, res) {
                    Page.find({})
                        .then(function(pages) {
                            console.log(pages);

                            expect(pages[0].title).to.eql('Our new post')
                            expect(pages.length).to.eql(1);
                        })
                    if (err) return done(err);
                    done();
                })

        });
    });

    describe('Checking using promises', function() {


    });



});