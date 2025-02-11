require('dotenv').config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Load facts from JSON file
let dinoFacts;
try {
    const rawData = fs.readFileSync("./facts.json");
    const factsData = JSON.parse(rawData);
    dinoFacts = factsData.dinoFacts;
    console.log(`✅ Loaded ${dinoFacts.length} facts from JSON file.`);
} catch (error) {
    console.error("❌ Error loading facts.json:", error);
}

// Function to send a random dinosaur fact
function sendFact() {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);
    if (channel && dinoFacts.length > 0) {
        const randomFact = dinoFacts[Math.floor(Math.random() * dinoFacts.length)];
        channel.send(randomFact);
    } else {
        console.error("⚠️ No facts loaded or channel not found!");
    }
}

// Bot is ready
client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    setInterval(sendFact, 100000); // 15-minute interval
});

// Log in to Discord
client.login(process.env.TOKEN);
