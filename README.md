# **FossilBot**  

FossilBot is a Discord bot designed to share random dinosaur facts and engage users with interactive trivia. Currently in its early development stages, this project aims to provide an educational and entertaining experience for dinosaur enthusiasts.

## **Features**  

- Automatically posts random dinosaur facts every **10 hours**  
- Command-based fact retrieval (`!fact`)  
- Interactive multiple-choice dinosaur trivia (`!trivia`)  
- Expanding trivia database with over 50+ questions  
- Lightweight and efficient, designed for seamless integration into Discord servers  

## **Installation**  

### **Requirements**  
- Node.js (latest LTS recommended)  
- A Discord bot token  
- A designated text channel in a Discord server  

### **Setup**  

1. Clone the repository and navigate to the project directory.  
2. Install dependencies:  

   ```sh
   npm install
   ```  

3. Create a `.env` file in the root directory and configure the following variables:  

   ```
   TOKEN=your_discord_bot_token_here
   CHANNEL_ID=your_channel_id_here
   ```  

4. Start the bot:  

   ```sh
   node index.js
   ```  

## **Commands**  

- `!fact` – Retrieves a random dinosaur fact  
- `!trivia` – Starts a multiple-choice trivia question  
- Respond with `A, B, C, or D` to answer trivia questions  

## **Roadmap**  

### **Short-Term Goals**  
- Add a trivia scoring system and leaderboard  
- Introduce timed trivia challenges  
- Expand the trivia question database  

### **Long-Term Goals**  
- Allow users to submit and suggest facts  
- Implement role-based permissions for commands  
- Store trivia scores and fact submissions in a database  
- Deploy to a cloud hosting service for 24/7 availability  

## **Contributing**  

Contributions are welcome. If you have suggestions or would like to contribute to the development of FossilBot, please open an issue or submit a pull request.  

## **License**  

This project is licensed under the MIT License. See `LICENSE` for details.  

## **Contact**  

For inquiries or support, please reach out via GitHub Issues or the associated Discord community.

