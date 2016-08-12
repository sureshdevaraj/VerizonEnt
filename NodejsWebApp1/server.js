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
