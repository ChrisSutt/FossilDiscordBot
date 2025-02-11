const fs = require("fs");

// Load dinosaur facts
let dinoFacts = [];
try {
    const rawFacts = fs.readFileSync("./facts.json", "utf8");
    const factsData = JSON.parse(rawFacts);
    dinoFacts = factsData.dinoFacts; // ✅ Ensure correct property name
    console.log(`✅ Loaded ${dinoFacts.length} dinosaur facts.`);
} catch (error) {
    console.error("❌ Error loading facts.json:", error);
}

// Function to send a random fact
function sendFact(channel) {
    if (dinoFacts.length === 0) {
        channel.send("⚠️ No facts available.");
        return;
    }

    const randomFact = dinoFacts[Math.floor(Math.random() * dinoFacts.length)];
    channel.send(`🦖 **Dinosaur Fact:** ${randomFact}`);
}

module.exports = { sendFact };
