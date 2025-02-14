# **FossilBot**  

FossilBot is a Discord bot designed to enhance **dinosaur-themed coordination and engagement** within your server. Whether you need to **track active players**, share **random dinosaur facts**, or challenge members with **interactive trivia**, FossilBot has you covered!

## **Features**  

### **Dino Logger System**
- Players can **log their active dinosaur** using `!dino <name>`.
- View the **latest list of active dinos** with `!dinos`.
- Players can **update their dino** with `!changeDino <new name>`.
- Players should **log off** when they leave using `!logoff`.
- **Moderators** can remove inactive players' logs using `!removeDino @user`.
- The **most recent list of active dinos is always pinned** at the bottom of the designated channel.

### **Dino Facts & Trivia**
- **Auto-posts** random dinosaur facts **every 10 hours**.
- Players can retrieve a **random dino fact** with `!fact`.
- Players can challenge themselves with **multiple-choice trivia** using `!trivia`.
- **Trivia answers** are submitted with `A, B, C, or D`.

### Premissions & Restrictions
- **Dino Logger commands** (`!dino`, `!dinos`, `!changedino`, `!logoff`) are **restricted to a specific channel**.
- **Moderators have admin-level commands** to clear outdated logs.
- **Facts & Trivia commands** cannot be used in the dino logger channel to maintain organization.

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
   FACTS_TRIVIA_ROLE=your_trivia_role_id_here
   DINO_LOGGER_ROLE=your_dino_logger_role_id_here
   DINO_LOGGER_CHANNEL=your_dino_logger_channel_id_here
   ADMIN_ROLES=admin_role_id_1,admin_role_id_2
   ```  

4. Start the bot:  

   ```sh
   node index.js
   ```  

## **Commands**  

### **Dino Logging Command**
- `!dino <name>` – Logs your active dino
- `!dinos` – View the list of active dinos
- `!changeDino <new name>` – Updates your logged dino
- `!logoff` – Removes your dino when leaving
- `!removeDino @user` – (Admin-only) Removes another player's log

### Facts & Trivia Commands
- `!fact` – Retrieves a random dinosaur fact
- `!trivia` – Starts a multiple-choice trivia question
- `A, B, C, or D` – Submit an answer to trivia

## **Roadmap**  

### **Short-Term Goals**  
- Add a trivia scoring system and leaderboard  
- Introduce timed trivia challenges  
- Expand the trivia question database
- Edit Dino Logging So The Bot continuously edits the same embed instead of posting new (Members posts will be deleted after they're entered)  

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

For inquiries or support, please reach out via GitHub Issues or Message on discord @zyoShi.

