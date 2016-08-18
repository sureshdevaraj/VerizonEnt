var restify = require('restify');
var builder = require('botbuilder');

var model = process.env.model || "https://api.projectoxford.ai/luis/v1/application/preview?id=5fd863f9-149a-476b-b077-af95cb2176de&subscription-key=4a43888f6be54422b9926075e4fb6762";
var modelUri = "https://api.projectoxford.ai/luis/v1/application?id=5fd863f9-149a-476b-b077-af95cb2176de&subscription-key=4a43888f6be54422b9926075e4fb6762";



var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
var bot = new builder.UniversalBot(connector);
//=========================================================
// Bot Setup
//=========================================================

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', connector.listen());
server.listen(process.env.port, function () {
    console.log("%s listening to %s", server.name, server.url);
});


//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', dialog);

// Add intent handlers
dialog.matches('builtin.intent.alarm.set_alarm', builder.DialogAction.send('Creating Alarm'));
dialog.matches('builtin.intent.alarm.delete_alarm', builder.DialogAction.send('Deleting Alarm'));
dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I can only create & delete alarms."));