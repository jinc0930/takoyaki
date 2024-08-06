require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, Attachment, AttachmentBuilder} = require('discord.js');
const mongoose = require('mongoose');
const eventHandler = require('./handlers/eventHandler');

//priviledges
const tako = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// connecting data base?
// (async()=>{
//     try {
//         await mongoose.connect(process.env.MONGODB_URL, {keepAlive: true});
//         console.log('Connected to DB');

//     } catch (error) {
//         console.log(`Error:  ${error}`);
//     }
    
// })

eventHandler(tako);
tako.login(process.env.TOKEN);

// // auto message reply
// tako.on('messageCreate', (message) =>{
//     if (message.author.bot){
//         return;
//     }
//     if (message.content === "hello"){
//         message.reply('Hello there!');
//     }
// });
