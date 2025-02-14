const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'dinos.json');
let dinoData = {};

// Load Existing Data
if (fs.existsSync(dataFile)) {
    dinoData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
}

module.exports = {
    name:'dinologger',
    description: 'Logs, views, and updates user dinosaurs.',

    execute(message, args) {
        const command = args[0]?.toLowerCase();
        const userId = message.author.id;
        const username = message.author.username;

        //Command to store dino
        if (command === 'dino') {
            const dinoName = args.slice(1).join(' ');
            if(!dinoName) {
                return message.reply('Please provide a dino name. Ex: `!dino White Berta`');
            }
            dinoData[userId] = { name: dinoName, username };
            saveData();
            message.reply(`Your Dino has been logged as ${dinoName}.`);
            return this.execute(message, ['dinos']); // Shows updated list
        }
        // Command to view stored dinos
        if (command === 'dinos') {
            if(Object.keys(dinoData).length === 0) {
                return message.reply('No Dinosaurs have been logged yet.');
            }
            let response = '**Logged Dinosaurs:**\n';
            for (const [id, data] of Object.entries(dinoData)) {
                response += `**${data.username}**: ${data.name}\n`;
            }
            return message.reply(response);
        }
        //Command to change dino (Maybe implement it so someone can just log a new dino instead)
        if (command === 'changedino') {
            const newDino = args.slice(1).join(' ');
            if (!newDino) {
                return message.reply('Please provide a new dinosaur name. Example: `!changedino Big Rex`');
            }
            if (!dinoData[userId]) {
                return message.reply('You dont have a logged dino yet. use `!dino <name>` First.');
            }
            dinoData[userId] = { name: newDino, username };
            saveData();
            return message.reply(`Your Dino has been updated to **${newDino}**.`);
        }

        if (command === 'logoff') {
            if (dinoData[userId]) {
                saveData(Data);
                return message.reply('Your dinosaur info has been removed from the database.');
            } else {
                return message.reply('You dont have a logged dino to remove.');
            }
        }
    }
};

// Save Dino Data
function saveData() {
    fs.writeFileSync(dataFile, JSON.stringify(dinoData, null, 2));
}