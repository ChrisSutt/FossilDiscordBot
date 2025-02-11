const fs = require("fs");

// Load Dino Facts
let dinoFacts =[];
try {
    const rawFacts = fs.readFileSync('./facts.json', "utf8");
    dinoFacts = JSON.parse(rawFacts).dinoFacts;
    console.log(`Loaded ${dinoFacts.length} dinosaur facts. `);
} catch (error) {
    console.error("Error Loading facts.json", error);
}

// Function to send a random fact
function sendFact(channel) {
    if (dinoFacts.length === 0) {
        channel.send(" No facts available.");
        return;
    }


    const randomFact = dinoFacts[Math.floor(Math.random() * dinoFacts.Length)]
    channel.send(` **Dinosaur Fact:** ${randomFact}`);

}

module.exports = { sendFact };