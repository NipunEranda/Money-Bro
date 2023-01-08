'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { MongoClient } = require("mongodb");
const middy = require('middy');

const mongoClient = new MongoClient(process.env.MONGO_URL);
const clientPromise = mongoClient.connect();

exports.saveUser = async (user) => {
    try {
        const database = (await clientPromise).db(process.env.MONGO_DB);
        const result = await database.collection('user').findOne({ email: user.email });
        let token = null;
        let insertedU = null;
        if (!result) {
            user.balance = 0;
            user.currency = 'USD';
            insertedU = await database.collection('user').insertOne(user);
            token = await new Promise((resolve, reject) => {
                jwt.sign({ user: { id: insertedU.insertedId.toString(), name: user.name, email: user.email, created: moment(new Date()).format('YYYY-MM-DD'), balance: user.balance, currency: user.currency, avatar: user.avatar } }, process.env.SECRET, { expiresIn: '24h' }, (err, token) => {
                    resolve(token);
                })
            });
        } else {
            token = await new Promise((resolve, reject) => {
                jwt.sign({ user: result }, process.env.SECRET, { expiresIn: '24h' }, (err, token) => {
                    resolve(token);
                })
            });
        }
        return { status: 200, response: { data: { status: 'success', token: token, user: result ? result : user }, error: null } };
    } catch (e) {
        console.log(e);
        return { status: 500, response: { data: null, error: e } };
    }
};

exports.verifyToken = function (req, res, next) {
    try {
        return ({
            before: (handler, next) => {
                const bearerHeader = (handler.event.headers['authorization'] != undefined) ? handler.event.headers['authorization'] : (handler.event.headers.authroization != undefined) ? handler.event.headers.authroization : null;
                if (typeof bearerHeader !== 'undefined') {
                    const bearer = bearerHeader.split(' ');
                    const bearerToken = bearer[1];
                    jwt.verify(bearerToken, process.env.SECRET);
                    next();
                }else{
                    return handler.callback(null, {
                        statusCode: 403,
                        body: JSON.stringify({
                            auth: 'no',
                            message: 'Access Denied'
                        })
                    });
                }
            }
        });
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            e.message = 'Token Expired';
        }
        console.log(e);
        return handler.callback(null, {
            statusCode: 403,
            body: JSON.stringify({})
        });
    }
}

exports.getUserDataFromToken = function (req) {
    try {
        const bearerHeader = req.headers.authroization;
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            const data = jwt.verify(bearerToken, process.env.SECRET);
            return data;
        } else
            return null;
    } catch (e) {
        console.log(e);
        return null;
    }
}

const handler = async function (event, context) {
    try {
        var result = null;
        if (event.path == '/.netlify/functions/auth/google' && event.httpMethod == 'POST') {
            result = await exports.saveUser({ sub: event.body.sub, name: event.body.name, email: event.body.email, avatar: event.body.picture });
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

exports.handler = middy(handler);