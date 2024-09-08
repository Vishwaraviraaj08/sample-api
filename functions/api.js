// packages
require("dotenv").config();
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();
const router = express.Router();


app.use(cors());
app.use(express.json())
router.use(express.urlencoded({ extended: true }));


router.get('/', (req, res) => {
    res.send('hello world');
})

app.use('/', router);

const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;


    return serverless(app)(event, context);
};
  
module.exports.handler = handler;