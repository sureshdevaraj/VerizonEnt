var restify = require('restify');
var builder = require('botbuilder');
/*
//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================
*/

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
        else if (session.userData.mainmenu == 2) {
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