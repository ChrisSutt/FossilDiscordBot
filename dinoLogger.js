const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Path to the JSON file to store dinos
const dataFile = path.join(__dirname, 'dinos.json');
let dinoData = {};

// Load Existing Data
if (fs.existsSync(dataFile)) {
    dinoData = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    cleanUpData();
}

module.exports = {
    name:'dinologger',
    description: 'Logs, views, and updates user dinosaurs.',

    execute(message, args) {
        const command = args.shift()?.toLowerCase(); // Shift to remove command from args
        const userId = message.author.id;
        const username = message.member ? message.member.displayName : message.author.username;

        if (command === 'dino') {
            const dinoName = args.join(' ');
            if(!dinoName) {
                return message.reply('Please provide a dino name. Ex: `!dino White Berta`');
            }
            dinoData[userId] = { name: dinoName, username };
            saveData();
            message.reply(`Your Dino has been logged as ${dinoName}.`);
            return this.execute(message, ['dinos']); // Show updated list
        }

        // Command to view logged dinos
        if (command === 'dinos') {
            if(Object.keys(dinoData).length === 0) {
                return message.reply('No Dinosaurs have been logged yet.');
            }

            const embed = new EmbedBuilder()
                .setTitle('Logged Dinosaurs')
                .setColor(0x00ff00);

            let description = '';
            for (const [id, data] of Object.entries(dinoData)) {
                if (id.startsWith("guest_")) {
                    for (const guest of data) {
                        description += `🦕 **${guest.username}** - ${guest.name}\n`;
                    }
                } else {
                    description += `🦕 <@${id}> - ${data.name}\n`;
                }
            }
            embed.setDescription(description);
            return message.channel.send({ embeds: [embed] });
        }

            // useless command as of right now
        if (command === 'changedino') {
            const newDino = args.join(' ');
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

            // Command to logoff / logout
        if (command === 'logoff' || command === 'logout') {
            if (dinoData[userId]) {
                delete dinoData[userId];
                saveData();
                message.reply('Your dinosaur info has been removed from the database.');
                return this.execute(message, ['dinos']);
            } else {
                return message.reply('You dont have a logged dino to remove.');
            }
        }
        
        // Remove Dino from logs
        if (command === 'removedino') {
            const targetUserId = args[0]; // Ensure correct argument reference
        
            if (!targetUserId.match(/^\d+$/)) { // Check if it's a valid Discord ID
                return message.reply('Invalid user ID. Please provide a valid Discord user ID.');
            }
            if (!dinoData[targetUserId]) { // Check if user has a dino logged
                return message.reply('That user does not have a logged dino.');
            }
        
            delete dinoData[targetUserId]; // Remove user from storage
            saveData(); // Save changes
        
            message.reply(`Successfully removed the dino log for <@${targetUserId}>.`);
            return this.execute(message, ['dinos']); // Refresh list
        }
        

            // Command to log a new guest name
        if (command === 'guest') {
            const guestName = args.shift();
            const dinoName = args.join(' ');
            if (!guestName || !dinoName) {
                return message.reply('Please provide a guest name and dinosaur name. Example: `!guest Alex Raptor`');
            }
            const guestKey = `guest_${guestName.toLowerCase()}`;
            if (!dinoData[guestKey]) {
                dinoData[guestKey] = [];
            }
            dinoData[guestKey].push({ name: dinoName, username: guestName });
            saveData();
            message.reply(`Guest **${guestName}** has been logged with the dinosaur **${dinoName}**.`);
            return this.execute(message, ['dinos']);
        }

            // command to remove guest account
        if (command === 'rmguest') {
            const guestName = args.join(' ').toLowerCase(); // Properly extract guest name
            if (!guestName) {
                return message.reply('Please provide the guest’s name. Example: `!rmguest Alex`');
            }
            const guestKey = `guest_${guestName}`;
            if (!dinoData[guestKey]) {
                return message.reply(`Guest **${guestName}** is not logged.`);
            }
            delete dinoData[guestKey];
            saveData();
            message.reply(`Guest **${guestName}** has been removed from the log.`);
            return this.execute(message, ['dinos']);
        }
    }
};

function saveData() {
    fs.writeFileSync(dataFile, JSON.stringify(dinoData, null, 2));
}

function cleanUpData() {
    for (const key in dinoData) {
        if (key.startsWith("guest_guest")) {
            delete dinoData[key];
        }
    }
    saveData();
    console.log("Removed invalid 'guest_guest' entries from dinos.json");
}
