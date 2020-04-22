/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const issueController = require("../controller/issuesController");
var expect = require('chai').expect;


module.exports = function (app) {

    app.route('/api/issues/:project')

        .get(async function (req, res) {
            var params = req.query;
            const result = await issueController.getIssues(params);
            res.json(result);
        })

        .post(async function (req, res) {
            var params = req.body;
            const result = await issueController.createIssue(params);
            res.json(result);
        })

        .put(async function (req, res) {
            var params = req.body;
            const result = await issueController.updateIssue(params);
            res.json(result);
        })

        .delete(async function (req, res) {
            var params = req.body;
            const result = await issueController.deleteIssue(params);
            res.json(result);

        });

};
