'use strict';
const { MongoClient, ObjectId } = require("mongodb");
const auth = require('./auth');
const middy = require('middy');

// ------------------------------------------------------------------------- Expenses ------------------------------------------------------------------------- 
exports.getExpenses = async (event) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(process.env.MONGO_URL);
        const clientPromise = mongoClient.connect();
        const data = auth.getUserDataFromToken(event);
        const database = (await clientPromise).db(process.env.MONGO_DB);
        if (data) {
            return { status: 200, response: { data: await database.collection('expenses').find().toArray(), error: null } };
        }
        return { status: 500, response: { data: null, error: 'something went wrong' } };
    } catch (e) {
        console.log(e);
        return { status: 500, response: { data: null, error: err } };
    } finally {
        mongoClient.close();
    }
}

exports.addExpense = async (event) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(process.env.MONGO_URL);
        const clientPromise = mongoClient.connect();
        const data = auth.getUserDataFromToken(event);
        const requestData = JSON.parse(event.body);
        const database = (await clientPromise).db(process.env.MONGO_DB);
        if (data) {
            requestData.user = data.user._id;

            //Insert expense
            await database.collection('expenses').insertOne(requestData);

            //Get user
            const user = await database.collection('users').findOne({ email: data.user.email });

            //Update user balance
            await database.collection('users').updateOne({ "email": data.user.email }, { $set: { balance: (user.balance - requestData.amount), currency: data.user.currency } });

            // Get Account
            const account = await database.collection('accounts').findOne({ _id: ObjectId(requestData.account) });

            //Update account balance
            await database.collection('accounts').updateOne({ _id: ObjectId(account._id) }, { $set: { amount: (account.amount - requestData.amount), currency: user.currency } });

            //Return data
            return { status: 200, response: { data: { expenses: await database.collection('expenses').find({ user: data.user._id }).toArray(), accounts: await database.collection('accounts').find({ user: data.user._id }).toArray(), user: await database.collection('users').findOne({ email: data.user.email }) }, error: null } };
        }
        return { status: 500, response: { data: null, error: 'something went wrong' } };
    } catch (e) {
        console.log(e);
        return { status: 500, response: { data: null, error: err } };
    } finally {
        mongoClient.close();
    }
}

exports.deleteExpense = async (event) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(process.env.MONGO_URL);
        const clientPromise = mongoClient.connect();
        const data = auth.getUserDataFromToken(event);
        const database = (await clientPromise).db(process.env.MONGO_DB);
        if (data) {
            //Get Expense
            const expense = await database.collection('expenses').findOne({ _id: ObjectId(event.queryStringParameters.id) });

            //Remove expense
            const result = await database.collection('expenses').deleteOne({ _id: ObjectId(event.queryStringParameters.id) });

            // Get Account
            const account = await database.collection('accounts').findOne({ _id: ObjectId(expense.account) });

            if (result.deletedCount === 1) {
                //Get user
                const user = await database.collection('users').findOne({ email: data.user.email });

                //Update user balance
                await database.collection('users').updateOne({ "email": data.user.email }, { $set: { balance: (user.balance + expense.amount), currency: user.currency } });

                //Update account balance
                await database.collection('accounts').updateOne({ _id: ObjectId(account._id) }, { $set: { amount: (account.amount + expense.amount), currency: user.currency } });

                //Return data
                return { status: 200, response: { data: { expenses: await database.collection('expenses').find({ user: data.user._id }).toArray(), accounts: await database.collection('accounts').find({ user: data.user._id }).toArray(), user: await database.collection('users').findOne({ email: data.user.email }) }, error: null } };
            }
            
            return { status: 500, response: { data: null, error: 'something went wrong' } };
        }
    } catch (e) {
        console.log(e);
        return { status: 500, response: { data: null, error: err } };
    } finally {
        mongoClient.close();
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------- 

// ------------------------------------------------------------------------- Icomes ------------------------------------------------------------------------- 

exports.getIncomes = async (event) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(process.env.MONGO_URL);
        const clientPromise = mongoClient.connect();
        const data = auth.getUserDataFromToken(event);
        const database = (await clientPromise).db(process.env.MONGO_DB);
        if (data) {
            return { status: 200, response: { data: await database.collection('incomes').find().toArray(), error: null } };
        }
        return { status: 500, response: { data: null, error: 'something went wrong' } };
    } catch (e) {
        console.log(e);
        return { status: 500, response: { data: null, error: err } };
    } finally {
        mongoClient.close();
    }
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------- 

const handler = async function (event, context) {
    try {
        var result = null;
        if (event.path == '/.netlify/functions/transaction/expenses/get' && event.httpMethod == 'GET') {
            result = await exports.getExpenses(event);
        } else if (event.path == '/.netlify/functions/transaction/expenses/add' && event.httpMethod == 'POST') {
            result = await exports.addExpense(event);
        } else if (event.path == '/.netlify/functions/transaction/expenses/delete' && event.httpMethod == 'DELETE') {
            result = await exports.deleteExpense(event);
        } else if (event.path == '/.netlify/functions/transaction/incomes/get' && event.httpMethod == 'GET') {
            result = await exports.getIncomes(event);
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