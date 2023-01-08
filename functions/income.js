'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { MongoClient } = require("mongodb");
const middy = require('middy');

exports.handler = middy(handler);