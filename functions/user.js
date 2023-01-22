'use strict';
const { MongoClient } = require("mongodb");
const auth = require('./auth');
const middy = require('middy');

exports.getUserDetails = async (event) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(process.env.MONGO_URL);
        const clientPromise = mongoClient.connect();
        const data = auth.getUserDataFromToken(event);
        if (data) {
            const database = (await clientPromise).db(process.env.MONGO_DB);
            return await database.collection('users').findOne({ "email": data.user.email });
        }
        return null;
    } catch (e) {
        console.log(e);
        return { status: 500, response: { data: null, error: err } };
    } finally {
        mongoClient.close();
    }
}

exports.updateUserBalance = async (event) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(process.env.MONGO_URL);
        const clientPromise = mongoClient.connect();
        const data = auth.getUserDataFromToken(event);
        if (data) {
            const database = (await clientPromise).db(process.env.MONGO_DB);
            await database.collection('users').updateOne({ "email": data.user.email }, { $set: { balance: parseFloat(JSON.parse(event.body).balance.toString()), currency: JSON.parse(event.body).currency } });
            return { status: 200, response: { data: { success: true } } };
        }
        return null;
    } catch (e) {
        console.log(e);
        return { status: 500, response: { data: null, error: err } };
    } finally {
        mongoClient.close();
    }
}

const handler = async function (event, context) {
    try {
        var result = null;
        if (event.path == '/.netlify/functions/user/email' && event.httpMethod == 'GET') {
            result = await exports.getUserDetails(event);
        } else if (event.path == '/.netlify/functions/user/balance' && event.httpMethod == 'PUT') {
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