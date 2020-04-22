const connection = require("./connection");

module.exports = {

    createIssue: async function (params) {
        const client = connection.getClient();
        const issueCollection = client.db("issues").collection("issues");
        const response = await issueCollection.insertOne(params);
        const doc = response.ops[0];
        return doc;
    },

    getIssueById: async function (id) {
        const client = connection.getClient();
        const issueCollection = client.db("issues").collection("issues");
        const doc = await issueCollection.findOne({ _id: id })
        return doc;
    },

    updateIssue: async function (params) {

        const { find, update } = params;
        const client = connection.getClient();
        const issueCollection = client.db("issues").collection("issues");
        const response = await issueCollection.findOneAndUpdate(find, { $set: update });
        return response;
    },

    getIssues: async function (params) {

        const client = connection.getClient();
        const issueCollection = client.db("issues").collection("issues");
        const docs = await issueCollection.find(params).toArray();
        return docs;
    },

    deleteIssue: async function (id) {

        const client = connection.getClient();
        const issueCollection = client.db("issues").collection("issues");
        const response = await issueCollection.findOneAndDelete({ _id: id });
        return response;
    },

}