require('dotenv').config();
const { Client, IntentsBitField} = require('discord.js');

//priviledges
const tako = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

//initialization (online status)
tako.on('ready', (client) => {
    console.log("Hello, Takoyaki is ready to see the world!");
});

// auto message reply
tako.on('messageCreate', (message) =>{
    if (message.author.bot){
        return;
    }
    if (message.content === "hello"){
        message.reply('Hello there!');
    }
});

//slash commands
tako.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'hug'){
        interaction.reply("testing, you attempted to hug");
    }
    if(interaction.commandName === 'anothercommand'){
        interaction.reply("yuh it worked");
    }
});

tako.login(process.env.TOKEN);
