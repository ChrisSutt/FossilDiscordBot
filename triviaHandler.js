const fs = require("fs");

// Load trivia questions
let triviaQuestions = [];
try {
    const rawTrivia = fs.readFileSync("./trivia.json", "utf8");
    triviaQuestions = JSON.parse(rawTrivia).questions;
    console.log(`✅ Loaded ${triviaQuestions.length} trivia questions.`);
} catch (error) {
    console.error("❌ Error loading trivia.json:", error);
}

// Active trivia tracking
const activeTrivia = {};

// Function to send a trivia question
function sendTriviaQuestion(channel) {
    if (triviaQuestions.length === 0) {
        channel.send("⚠️ No trivia questions available.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
    const trivia = triviaQuestions[randomIndex];

    const triviaMessage = `🦖 **Dinosaur Trivia!** 🦖\n\n${trivia.question}\n${trivia.choices.join("\n")}\n\nType **A, B, C, or D** to answer!`;

    channel.send(triviaMessage);

    // ✅ Store the correct answer for checking
    activeTrivia[channel.id] = trivia.answer;
}

// Function to check trivia answers
function checkTriviaAnswer(message) {
    // ✅ Debugging: Log the received message
    console.log(`📩 Received message: "${message.content}" from ${message.author.tag}`);

    // ✅ Ensure there's an active trivia question in the channel
    if (!activeTrivia[message.channel.id]) return;

    const userAnswer = message.content.trim().toUpperCase();

    // ✅ Debugging: Log what the bot is expecting
    console.log(`🤖 Expecting answer: ${activeTrivia[message.channel.id]}`);

    // ✅ Ignore messages that are not A, B, C, or D
    if (!["A", "B", "C", "D"].includes(userAnswer)) return;

    // ✅ Check if the user's answer is correct
    if (userAnswer === activeTrivia[message.channel.id]) {
        message.channel.send(`✅ Correct, ${message.author.username}! The answer was **${userAnswer}**.`);
    } else {
        message.channel.send(`❌ Incorrect, ${message.author.username}. The correct answer was **${activeTrivia[message.channel.id]}**.`);
    }

    // ✅ Remove the active question after an answer is received
    delete activeTrivia[message.channel.id];
}

// Export functions
module.exports = { sendTriviaQuestion, checkTriviaAnswer };
