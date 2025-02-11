require('dotenv').config();
const { Client, GatewayIntentBits } = require("discord.js");
const { sendFact } = require("./factHandler");
const { sendTriviaQuestion, checkTriviaAnswer } = require("./triviaHandler");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("messageCreate",(message) => {
    if (message.author.bot) return;

    //Fact Command

    if (message.content.toLowerCase() === "!fact") {
        sendFact(message.channel);
    }

    //Trivia Command
    
    if (message.content.toLowerCase() === "!trivia") {
        sendTriviaQuestion(message.channel);
    }

    //handle Trivia Answer
    checkTriviaAnswer(message);
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
        }, 360000000); //10 hours
    });

    client.login(process.env.TOKEN);
