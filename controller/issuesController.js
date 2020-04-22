const { v4: uuidv4 } = require('uuid');
const Issues = require("../datalayer/Issues");

module.exports = {

    createIssue: async function (params) {

        // verify params
        let { issue_title, issue_text, created_by, assigned_to, status_text } = params;

        // issue_title, issue_text and created_by is required
        if (!issue_title || !issue_text || !created_by) {
            return { error: "Missing required info" };
        }

        // default value for optional fields
        if (!assigned_to) {
            assigned_to = "";
        }

        if (!status_text) {
            status_text = "";
        }

        // create additional fields : created_on, updated_on, open, _id
        const created_on = new Date();
        const updated_on = new Date();
        const open = true;
        const _id = uuidv4();

        // prepare document and call datalayer to save in database
        const issue = {
            _id,
            issue_title, issue_text, created_by, assigned_to, status_text,
            open, created_on, updated_on
        }

        const newIssue = await Issues.createIssue(issue);

        return newIssue;
    },

    updateIssue: async function (params) {

        const { _id, ...updated_fields } = params;

        // try to get document in database in id, if no document found return error
        const issue = await Issues.getIssueById(_id);
        if (!issue) {

            return { error: "could not update " + _id }
        }

        // update document in database
        const find = { _id: _id };
        const update = { updated_on: new Date(), ...updated_fields };
        if (typeof updated_fields.open != "undefined") {
            update.open = (params.open == "true");
        }

        const response = await Issues.updateIssue({ find, update });

        // if updated_fields is an empty object
        if (Object.entries(updated_fields).length == 0) {

            return { message: "no updated field sent" };
        }

        return { message: "successfully updated" }
    },

    getIssues: async function (params) {

        // format params from query string
        const paramsToDB = params;
        if (typeof params.open != "undefined") {
            paramsToDB.open = (params.open == "true");
        }

        const issues = await Issues.getIssues(paramsToDB);
        return issues;
    },

    deleteIssue: async function (params) {

        if (!params._id) {

            return { error: "could not delete" };
        }

        const response = await Issues.deleteIssue(params._id);

        return { message: "deleted " + params._id };
    }

}