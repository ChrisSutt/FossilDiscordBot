require('dotenv').config();
const { Client, GatewayIntentBits } = require("discord.js");
const { sendFact } = require("./factHandler");
const { sendTriviaQuestion, checkTriviaAnswer } = require("./triviaHandler");
const dinoLogger = require('./dinoLogger');
const path = require('path');
const fs = require('fs');
let dinoData = {};


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const prefix = '!';

// Load Role and Channel restrictions from .env
const FACTS_TRIVIA_ROLE = process.env.FACTS_TRIVIA_ROLE;
const DINO_LOGGER_ROLE = process.env.DINO_LOGGER_ROLE;
const DINO_LOGGER_CHANNEL = process.env.DINO_LOGGER_CHANNEL;
const DINO_LOGGER_BROADCAST_CHANNEL = process.env.DINO_LOGGER_BROADCAST_CHANNEL;
const ADMIN_ROLES = process.env.ADMIN_ROLES.split(",");

const dataFile = path.join(__dirname, 'dinos.json');

client.on("messageCreate",(message) => {
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    //Fact Command

    if (command === 'fact') {
        if (message.channel.id === DINO_LOGGER_CHANNEL) {
            return message.reply("Fact cannot be used in this channel.");
        }
        sendFact(message.channel);
    }

    //Trivia Command
    
    if (command === 'trivia') {
        if (message.channel.id === DINO_LOGGER_CHANNEL) {
            return message.reply("Trivia cannot be used in this channel.");
        }
        sendTriviaQuestion(message.channel);
    }

    //handle Trivia Answer
    checkTriviaAnswer(message);


    // Dino Logger Commands
    if (['dino', 'dinos', 'changedino', 'logoff', 'logout', 'guest', 'rmguest'].includes(command)) {
        if (!message.member.roles.cache.has(DINO_LOGGER_ROLE)) {
            return message.reply("You do not have permission to use this command.");
        }
        if (message.channel.id !== DINO_LOGGER_CHANNEL) {
            return message.reply(`Please use this command in <#${DINO_LOGGER_CHANNEL}>.`);
        }
        dinoLogger.execute(message, [command, ...args]);
    }
    // ADMIN COMMAND: Remove Users Dino Log
    if (command === "removedino") {
        const hasAdminRole = message.member.roles.cache.some(role => ADMIN_ROLES.includes(role.id));
        if (!hasAdminRole) {
            return message.reply("You do not have permission to use this");
        }
        const targetUser = args[0]?.replace(/[^0-9]/g, ""); //Gets user ID
        if (!targetUser) {
            return message.reply("Please mention a valid user or provide their ID.");
        }
        dinoLogger.execute(message, ["removedino", targetUser]);
        
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

            //Auto-broadcast Dino Logger to another channel every 5 minutes
            let broadcastInterval = 600000; // Default to 10 minutes

            function updateBroadcastInterval() {
                if (fs.existsSync(dataFile)) {
                    dinoData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
                }
                const loggedCount = Object.keys(dinoData).length;
                return loggedCount > 3 ? 600000 : 1800000; // 10 minutes if more than 3, otherwise 30 minutes
            }
        
            setInterval(() => {
                broadcastInterval = updateBroadcastInterval();
                
                if (Object.keys(dinoData).length > 0) {
                    const dinoBroadcastChannel = client.channels.cache.get(DINO_LOGGER_BROADCAST_CHANNEL);
                    if (dinoBroadcastChannel) {
                        dinoLogger.execute(
                            { channel: dinoBroadcastChannel, author: { bot: true } }, // Fake message object
                            ["dinos"]
                        );
                    }
                }
            }, updateBroadcastInterval());
        });

    client.login(process.env.TOKEN);
