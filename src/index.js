require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, Attachment, AttachmentBuilder} = require('discord.js');

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
        const target_user = interaction.options.get('target-user');
        const origin_user = interaction.user;

        const target_id = '<@'+ target_user.user.id +">";
        if(origin_user.id ==  target_user.user.id){
            interaction.reply({
                content: ' You cannot hug yourself',
                ephemeral: true,
            })
        }
        else{
            // interaction.reply(`Hello, ${origin_user} hugged ${target_id}`);
            // const testingEmbed = new EmbedBuilder().setTitle('hug');
            var targetname = target_user.user.globalName;
            if (target_user.member.nickname != null){
                targetname = target_user.member.nickname;
            }

            //getting origin user's guild name
            const originname = interaction.member.displayName;
            //list all file names
            const filename_arr = ['hug.gif','hug2.gif','hug3.gif'];
            //randomly select one to display
            var filename = filename_arr[Math.floor(Math.random()* filename_arr.length)];
            let file = new AttachmentBuilder('./assets/'+ filename);

            const testingEmbed = new EmbedBuilder()
                .setTitle(`${originname} hugged ${targetname}`)
                .setImage('attachment://'+ filename);
            
            interaction.reply({embeds: [testingEmbed], files: [file]});
        }
    }
    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`Testing options command, the sum is ${num1 + num2}`);
    }
    if (interaction.commandName === 'flip'){
        const origin_user = interaction.user;
        let file = new AttachmentBuilder('./assets/coinflip.gif');

        const Embed = new EmbedBuilder()
                .setTitle(`Flipping a coin...`)
                .setImage('attachment://coinflip.gif');
            
        interaction.reply({embeds: [Embed], files: [file]});
    }
});

tako.login(process.env.TOKEN);
