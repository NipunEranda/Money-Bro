'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { MongoClient } = require("mongodb");
const middy = require('middy');

exports.saveUser = async (user) => {
    let mongoClient;
    try {
        mongoClient = new MongoClient(process.env.MONGO_URL);
        const clientPromise = mongoClient.connect();
        const database = (await clientPromise).db(process.env.MONGO_DB);
        const result = await database.collection('users').findOne({ email: user.email });
        let token = null;
        let insertedU = null;
        if (!result) {
            user.balance = 0;
            user.currency = 'USD';
            user.expenseTypes = [],
            user.incomeTypes = [],
            user.accountTypes = [{
                id: 1,
                name: 'General',
                icon: 'fa-coins'
            },
            {
                id: 2,
                name: 'Debit Card',
                icon: 'fa-credit-card'
            },
            {
                id: 3,
                name: 'Credit Card',
                icon: 'fa-credit-bank'
            },
            {
                id: 4,
                name: 'Cash',
                icon: 'fa-money-bill'
            },
            {
                id: 5,
                name: 'Wallet',
                icon: 'fa-wallet'
            },
            {
                id: 6,
                name: 'Saving Account',
                icon: 'fa-piggy-bank'
            },
            {
                id: 7,
                name: 'Bank',
                icon: 'fa-building-columns'
            },
            {
                id: 8,
                name: 'Vault',
                icon: 'fa-vault'
            },
            ];
            insertedU = await database.collection('users').insertOne(user);
            token = await new Promise((resolve, reject) => {
                jwt.sign({ user: { _id: insertedU.insertedId.toString(), name: user.name, email: user.email, created: moment(new Date()).format('YYYY-MM-DD'), balance: user.balance, currency: user.currency, avatar: user.avatar } }, process.env.SECRET, { expiresIn: '24h' }, (err, token) => {
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
    } finally {
        mongoClient.close();
    }
};

exports.verifyToken = function () {
    try {
        return ({
            before: (handler, next) => {
                const bearerHeader = (handler.event.headers['authorization'] != undefined) ? handler.event.headers['authorization'] : (handler.event.headers.authroization != undefined) ? handler.event.headers.authroization : null;
                if (bearerHeader != null) {
                    const bearer = bearerHeader.split(' ');
                    const bearerToken = bearer[1];
                    jwt.verify(bearerToken, process.env.SECRET);
                    next();
                } else {
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

exports.getUserDataFromToken = function (event) {
    try {
        const bearerHeader = (event.headers['authorization'] != undefined) ? event.headers['authorization'] : (event.headers.authroization != undefined) ? event.headers.authroization : null;
        if (bearerHeader != null) {
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
            result = await exports.saveUser({ sub: JSON.parse(event.body).sub, name: JSON.parse(event.body).name, email: JSON.parse(event.body).email, avatar: JSON.parse(event.body).picture });
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