'use strict';
const { MongoClient } = require("mongodb");
const auth = require('./auth');
const middy = require('middy');

const mongoClient = new MongoClient(process.env.MONGO_URL);
const clientPromise = mongoClient.connect();

exports.getUserDetails = async (req) => {
    try {
        const data = auth.getUserDataFromToken(req);
        if (data) {
            const database = (await clientPromise).db(process.env.MONGO_DB);
            return await database.collection('user').findOne({ "email": data.user.email });
        }
    } catch (e) {
        console.log(e);
        return { status: 500, response: { data: null, error: err } };
    }
}

exports.updateUserBalance = async (event) => {
    try {
        console.log(event.body);
        return { status: 200, response: { data: [] } };
    } catch (e) {
        console.log(e);
        return { status: 500, response: { data: null, error: err } };
    }
}

const handler = async function (event, context) {
    try {
        var result = null;
        if (event.path == '/.netlify/functions/user/email' && event.httpMethod == 'GET') {
            result = await exports.getUserDetails(req, res);
        }else if (event.path == '/.netlify/functions/user/balance' && event.httpMethod == 'PUT') {
            result = await exports.updateUserBalance(event);
        }
        return {
            statusCode: result ? result.status ? result.status : 500 : 500,
            body: JSON.stringify(result.response)
        }
    } catch (e) {
        return {
            statusCode: 500 || e.status,
            body: e.message,
        }
    }
}

exports.handler = middy(handler).use(auth.verifyToken());