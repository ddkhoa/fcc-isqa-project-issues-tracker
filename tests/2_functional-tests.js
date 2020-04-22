/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

    suite('POST /api/issues/{project} => object with issue data', function () {

        test('Every field filled in', function (done) {
            chai.request(server)
                .post('/api/issues/test')
                .send({
                    issue_title: 'Title',
                    issue_text: 'text',
                    created_by: 'Functional Test - Every field filled in',
                    assigned_to: 'Chai and Mocha',
                    status_text: 'In QA'
                })
                .end(function (err, res) {

                    assert.equal(res.status, 200);

                    //fill me in too!
                    assert.equal(res.body.issue_title, 'Title');
                    assert.equal(res.body.issue_text, 'text');
                    assert.equal(res.body.created_by, 'Functional Test - Every field filled in');
                    assert.equal(res.body.assigned_to, 'Chai and Mocha');
                    assert.equal(res.body.status_text, 'In QA');

                    assert.isDefined(res.body.created_on);
                    assert.isDefined(res.body.updated_on);
                    assert.equal(res.body.open, true);
                    assert.isString(res.body._id);

                    done();
                });
        });

        test('Required fields filled in', function (done) {
            chai.request(server)
                .post('/api/issues/test')
                .send({
                    issue_title: 'Title',
                    issue_text: 'text',
                    created_by: 'Functional Test - Required field filled in',
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);

                    //fill me in too!
                    assert.equal(res.body.issue_title, 'Title');
                    assert.equal(res.body.issue_text, 'text');
                    assert.equal(res.body.created_by, 'Functional Test - Required field filled in');
                    assert.equal(res.body.assigned_to, '');
                    assert.equal(res.body.status_text, '');

                    assert.isDefined(res.body.created_on);
                    assert.isDefined(res.body.updated_on);
                    assert.equal(res.body.open, true);
                    assert.isString(res.body._id);


                    done();
                });
        });

        test('Missing required fields', function (done) {
            chai.request(server)
                .post('/api/issues/test')
                .send({
                    issue_title: 'Title',
                    // issue_text: 'text', MISSING issue_text
                    created_by: 'Functional Test - Missing required fields',
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);

                    //fill me in too!
                    assert.equal(res.body.error, 'Missing required info');
                    done();
                });
        });

    });

    suite('PUT /api/issues/{project} => text', function () {

        let id = "";
        before(function (done) {

            // setup data in database, use POST request which has been tested above
            chai.request(server)
                .post('/api/issues/test')
                .send({
                    issue_title: 'Dummy',
                    issue_text: 'text AZDQRAF',
                    created_by: 'Me',
                })
                .end(function (err, res) {

                    id = res.body._id;
                    done();
                })
        });

        test('No body', function (done) {
            chai.request(server)
                .put('/api/issues/test')
                .send({
                    id: id,
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);

                    //fill me in too!
                    assert.equal(res.body.message, 'no updated field sent');
                    done();
                });
        });

        test('One field to update', function (done) {
            chai.request(server)
                .put('/api/issues/test')
                .send({
                    id: id,
                    issue_title: 'Title updated'
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);

                    //fill me in too!
                    assert.equal(res.body.message, 'successfully updated');
                    done();
                });
        });

        test('Multiple fields to update', function (done) {
            chai.request(server)
                .put('/api/issues/test')
                .send({
                    id: id,
                    issue_title: 'Title updated',
                    issue_text: 'Text updated',
                })
                .end(function (err, res) {
                    assert.equal(res.status, 200);

                    //fill me in too!
                    assert.equal(res.body.message, 'successfully updated');
                    done();
                });
        });

    });

    suite('GET /api/issues/{project} => Array of objects with issue data', function () {

        test('No filter', function (done) {
            chai.request(server)
                .get('/api/issues/test')
                .query({})
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.property(res.body[0], 'issue_title');
                    assert.property(res.body[0], 'issue_text');
                    assert.property(res.body[0], 'created_on');
                    assert.property(res.body[0], 'updated_on');
                    assert.property(res.body[0], 'created_by');
                    assert.property(res.body[0], 'assigned_to');
                    assert.property(res.body[0], 'open');
                    assert.property(res.body[0], 'status_text');
                    assert.property(res.body[0], '_id');
                    done();
                });
        });

        test('One filter', function (done) {
            chai.request(server)
                .get('/api/issues/test')
                .query({ open: true })  // assume there is at least 1 open issue in db ?
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.property(res.body[0], 'issue_title');
                    assert.property(res.body[0], 'issue_text');
                    assert.property(res.body[0], 'created_on');
                    assert.property(res.body[0], 'updated_on');
                    assert.property(res.body[0], 'created_by');
                    assert.property(res.body[0], 'assigned_to');
                    assert.property(res.body[0], 'open');
                    assert.property(res.body[0], 'status_text');
                    assert.property(res.body[0], '_id');
                    res.body.forEach(item => {
                        assert.equal(item.open, true);
                    })
                    done();
                });
        });

        test('Multiple filters (test for multiple fields you know will be in the db for a return)', function (done) {
            chai.request(server)
                .get('/api/issues/test')
                .query({ open: true, assigned_to: "" })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.property(res.body[0], 'issue_title');
                    assert.property(res.body[0], 'issue_text');
                    assert.property(res.body[0], 'created_on');
                    assert.property(res.body[0], 'updated_on');
                    assert.property(res.body[0], 'created_by');
                    assert.property(res.body[0], 'assigned_to');
                    assert.property(res.body[0], 'open');
                    assert.property(res.body[0], 'status_text');
                    assert.property(res.body[0], '_id');
                    res.body.forEach(item => {
                        assert.equal(item.open, true);
                        assert.equal(item.assigned_to, "");
                    })
                    done();
                });
        });

    });

    suite('DELETE /api/issues/{project} => text', function () {

        let id = "";

        before(function (done) {

            // setup data in database, use POST request which has been tested above
            chai.request(server)
                .post('/api/issues/test')
                .send({
                    issue_title: 'Dummy',
                    issue_text: 'text AZDQRAF',
                    created_by: 'Me',
                })
                .end(function (err, res) {

                    id = res.body._id;
                    done();
                })
        });

        test('No id', function (done) {
            chai.request(server)
                .delete('/api/issues/test')
                .send({})
                .end(function (err, res) {
                    assert.equal(res.status, 200);

                    //fill me in too!
                    assert.equal(res.body.error, 'could not delete');
                    done();
                });
        });

        test('Valid id', function (done) {

            chai.request(server)
                .delete('/api/issues/test')
                .send({ id })
                .end(function (err, res) {
                    assert.equal(res.status, 200);

                    //fill me in too!
                    assert.equal(res.body.message, 'deleted ' + id);
                    done();
                });
        });

    });

});
