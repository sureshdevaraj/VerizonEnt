/*
var builder = require('botbuilder');
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);
var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^Hi/i, [
    function (session) {
        builder.Prompts.text(session, 'Hi there! How are you today?');
    },
    function (session, results) {
        session.send('%s! How can I help you?', results.response);
    }
]);
intents.matches(/^need version/i, builder.DialogAction.send('The Latest Bot version is 1.1'));
intents.onDefault(builder.DialogAction.send('Hi there! How can I help you today?'));
*/
/*
var builder = require("botbuilder");
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

bot.dialog("/", [

    function (session) {
        builder.Prompts.text(session, "Hello..whats your name?");
    },
    function (session, results) {
        session.userData.name = results.response;
        builder.Prompts.number(session, "Hi " + results.response + ", How many years have u been coding?");
    },
    function (session, results) {
        session.userData.coding = results.response;
        builder.Prompts.choice(session, "What language do you code Node using?", ["Javascript", "TypeScript"]);
    },
    function (session, results) {
        session.userData.language = results.response.entity;
        session.send("Got it.." + session.userData.name +
            " you have been programming for " + session.userData.coding +
            "years and use " + session.userData.language + ".");
    }
]);
*/
/*
var builder = require("botbuilder");
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

bot.dialog("/", [

    function (session) {        
        builder.Prompts.choice(session, "Hello..Welcome to Entertainment Bot.I can help with ", ["Programs", "Trending Now", "What's Hot", "Prime Time", "Schedule of a Program"]);
    },
    
    function (session, results) {
        session.userData.mainmenu = results.response.entity;
        if (session.userData.mainmenu == 1) {
            builder.Prompts.choice(session, "Which Program you are intrested in?", ["Programs Tending 1", "Programs Tending 2", "Programs Tending3"]);

        }
        else if (session.userData.mainmenu == 2)
        {
            builder.Prompts.choice(session, "Which Program you are intrested in?", ["What's Hot 1", "What's Hot 2", "What's Hot 3"]);
        }
        else if (session.userData.mainmenu == 3) {
            builder.Prompts.choice(session, "Which Program you are intrested in?", ["Primetime 1", "Primetime 2", "Primetime 3"]);
        }
        else if (session.userData.mainmenu == 4) {
            builder.Prompts.choice(session, "Which Program you are intrested in?", ["Schedule 1", "Schedule 2", "Schedule 3"]);
        }    
        session.userData.submenu = results.response.entity;
        session.send(session.userData.submenu);            
    },
    
]);

*/
/*
var builder = require("botbuilder");
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);



bot.dialog('/', [
    function (session) {
        // Send a greeting and show help. 
        var card = new builder.HeroCard(session)
        title("Microsoft Bot Framework")
        text("Your bots - wherever your users are talking.")
        images([
            builder.CardImage.create(session, "http://docs.botframework.com/images/demo_bot_image.png")
        ]);
        var msg = new builder.Message(session).attachments([card]);
        session.send(msg);
        session.send("Hi... I'm the Microsoft Bot Framework demo bot for Facebook. I can show you everything you can use our Bot Builder SDK to do on Facebook.");
        session.beginDialog('/help');

    },
    function (session, results) {
        // Display menu 
        session.beginDialog('/menu');

    },
    function (session, results) {
        // Always say goodbye 
        session.send("Ok... See you later!");

    }
]);


*/
var restify = require('restify');
var builder = require('botbuilder');

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: '3cc73cc0-e212-488e-8d47-4cab7f593c32', appSecret: '6VG4DophXbiNuTdKdBEWQSn' });
bot.add('/', function (session) {
    session.send('Hello World');
});

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
