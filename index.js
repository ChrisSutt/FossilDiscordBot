require('dotenv').config();
const { Client, GatewayIntentBits } = require("discord.js");
const { sendFact } = require("./factHandler");
const { sendTriviaQuestion, checkTriviaAnswer } = require("./triviaHandler");
const dinoLogger = require('./dinoLogger');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const prefix = '!';

client.on("messageCreate",(message) => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    //Fact Command

    if (command === 'fact') {
        sendFact(message.channel);
    }

    //Trivia Command
    
    if (command === 'trivia') {
        sendTriviaQuestion(message.channel);
    }

    //handle Trivia Answer
    checkTriviaAnswer(message);


    // Dino Logger Commands
    if (['dino', 'dinos', 'changedino'].includes(command)) {
        dinoLogger.execute(message, [command, ...args]);
    };
});

    //Bot ready
    client.once("ready", () => {
        console.log(` Logged in as ${client.user.tag}`);

        //Auto-send dino facts
        setInterval(() => {
            const channel = client.channels.cache.get(process.env.CHANNEL_ID);
            if(channel) {
                sendFact(channel);
            }
        }, 36000000); //10 hours
    });

    client.login(process.env.TOKEN);
