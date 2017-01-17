var Botkit = require('./node_modules/botkit/lib/Botkit.js');

var cleverbot = require("cleverbot.io"),
    cleverbot = new cleverbot(process.env.CLEVERBOT_API_USER, process.env.CLEVERBOT_API_TOKEN);
cleverbot.setNick("Cooper");

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 1337;
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.status(200).send('Hello world!');
});

app.listen(port, function () {

    console.log('Listening on port ' + port);

});


var currentTime = new Date().getHours();

var http = require("http");

if (currentTime >= 6) {
    setInterval(function () {
        http.get("http://slackbot-cooper.herokuapp.com");
    }, 300000);
}




var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.SLACK_API_TOKEN
}).startRTM(function (err) {
    if (err) {
        throw new Error(err);
    }
});


cleverbot.create(function (err, session) {
    if (err) {
        console.log('cleverbot create fail.');
    } else {
        console.log('cleverbot create success.');
    }
});

controller.hears('', 'direct_message,direct_mention,mention', function (bot, message) {
    var msg = message.text;
    cleverbot.ask(msg, function (err, response) {
        if (!err) {
            bot.reply(message, response);
        } else {
            console.log('cooper err: ' + err);
        }
    });
});