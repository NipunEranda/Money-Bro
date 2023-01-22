'use strict';
const { MongoClient, ObjectId } = require("mongodb");
const auth = require('./auth');
const middy = require('middy');

exports.getAccounts = async (event) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(process.env.MONGO_URL);
        const clientPromise = mongoClient.connect();
        const data = auth.getUserDataFromToken(event);
        const database = (await clientPromise).db(process.env.MONGO_DB);
        if (data) {
            return { status: 200, response: { data: await database.collection('accounts').find({ user: data.user._id }).toArray(), error: null } };
        }
        return { status: 500, response: { data: null, error: 'something went wrong' } };
    } catch (e) {
        console.log(e);
        return { status: 500, response: { data: null, error: err } };
    } finally {
        mongoClient.close();
    }
}

exports.addAccount = async (event) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(process.env.MONGO_URL);
        const clientPromise = mongoClient.connect();
        const data = auth.getUserDataFromToken(event);
        const database = (await clientPromise).db(process.env.MONGO_DB);
        if (data) {
            const account = JSON.parse(event.body);
            account.user = data.user._id;

            //Insert account
            await database.collection('accounts').insertOne(account);

            //Get user
            const user = await database.collection('users').findOne({ email: data.user.email });

            //Update user balance
            await database.collection('users').updateOne({ "email": data.user.email }, { $set: { balance: (user.balance + account.amount), currency: data.user.currency } });
           
            //Return data
            return { status: 200, response: { data: { accounts: await database.collection('accounts').find({ user: data.user._id }).toArray(), user: await database.collection('users').findOne({ email: data.user.email }) }, error: null } };
        }
        return { status: 500, response: { data: null, error: 'something went wrong' } };
    } catch (e) {
        console.log(e);
        return { status: 500, response: { data: null, error: err } };
    } finally {
        mongoClient.close();
    }
}

exports.deleteAccount = async (event) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(process.env.MONGO_URL);
        const clientPromise = mongoClient.connect();
        const data = auth.getUserDataFromToken(event);
        const database = (await clientPromise).db(process.env.MONGO_DB);
        if (data) {
            
            //Get account
            const account = await database.collection('accounts').findOne({_id: ObjectId(event.queryStringParameters.id)});

            //Remove account
            const result = await database.collection('accounts').deleteOne({ _id: ObjectId(event.queryStringParameters.id) });
            if (result.deletedCount === 1) {
                //Get user
                const user = await database.collection('users').findOne({ email: data.user.email });

                //Update user balance
                await database.collection('users').updateOne({ "email": data.user.email }, { $set: { balance: (user.balance - account.amount), currency: data.user.currency } });

                //Return data
                return { status: 200, response: { data: { accounts: await database.collection('accounts').find({ user: data.user._id }).toArray(), user: await database.collection('users').findOne({ email: data.user.email }) }, error: null } };
            } else {
                return { status: 500, response: { data: null, error: 'something went wrong' } };
            }
        }
        return { status: 500, response: { data: null, error: 'something went wrong' } };
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
        if (event.path == '/.netlify/functions/account/add' && event.httpMethod == 'POST') {
            result = await exports.addAccount(event);
        } else if (event.path == '/.netlify/functions/account/get' && event.httpMethod == 'GET') {
            result = await exports.getAccounts(event);
        } else if(event.path == '/.netlify/functions/account/delete' && event.httpMethod == 'DELETE'){
            result = await exports.deleteAccount(event);
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