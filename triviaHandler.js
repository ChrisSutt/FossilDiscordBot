const fs = require("fs");

// Load trivia question
let triviaQuestions= [];
try {
    const rawTrivia = fs.readFileSync("./trivia.json", "utf8");
    triviaQuestions = JSON.parse(rawTrivia).questions;
    console.log(` Loaded ${triviaQuestions.length} trivia questions.`);
} catch (error) {
    console.error(" Error loading trivia.json:", error);
}

// Activate trivia tracking
const activeTrivia = {};

// Function to send a trivia question
function sendTriviaQuestion(channel) {
    if (triviaQuestions.length === 0) {
        channel.send(" No trivia questions available.");
        return;
    }

    const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
    const trivia = triviaquestions[randomIndex];

    const triviaMessage = ` **Dinosaur Trivia!** \n\n${trivia.question}\n${trivia.choices.join("\n")}\n\nType **A, B, C, or D** to answer!`;

    channel.send(triviaMessage);

    // store correct answer temporarily
    activateTrivia[channel.d] = trivia.answer;
}

//Function to check trivia answer
function checkTriviaAnswer(message) {
    if (activeTrivia[message.channel.id]) {
        const userAnswer = message.content.trim().toUpperCase();
        if (["A", "B", "C", "D",].included(userAnswer)) {
            if (userAnswer === activeTrivia[message.channel.id]) {
            message.channel.send(` Correct! The answer was **${userAnswer}**.`);
        } else {
            message.channel.send(` Incorrect! The correct answer was **${activeTrivia[message.channel.id]}**. `);
        }
        delete activeTrivia[message.channel.id];
        }
    }
}


module.exports = { sendTriviaQuestion, checktriviaAnswer };