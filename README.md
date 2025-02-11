# **FossilBot**  

FossilBot is a Discord bot designed to share random dinosaur facts at regular intervals. Currently in its early development stages, this project aims to provide an engaging and educational experience for users interested in prehistoric life.  

## **Features**  

- Automatically posts random dinosaur facts every 15 minutes  
- Extensive fact database stored in JSON for easy updates and scalability  
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

## **Roadmap**  

### **Short-Term Goals**  
- Implement command-based fact retrieval (`/fact`)  
- Expand the fact database with additional categories  
- Improve error handling and logging  

### **Long-Term Goals**  
- Allow users to submit and suggest facts  
- Develop an interactive trivia feature  
- Implement database storage for scalability  
- Deploy to a cloud hosting service for 24/7 availability  

## **Contributing**  

Contributions are welcome. If you have suggestions or would like to contribute to the development of DinoFactsBot, please open an issue or submit a pull request.  

## **License**  

This project is licensed under the MIT License. See `LICENSE` for details.  

## **Contact**  

For inquiries or support, please reach out via GitHub Issues or the associated Discord community.  
