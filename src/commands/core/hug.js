const { ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
    name: 'hug',
    description: 'hug someone',
    options: [
        {
            name: 'target-user',
            description: "the user you want to hug",
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        }
    ],

    callback: async(client, interaction) =>{
        if (!interaction.isChatInputCommand()) return;

        const target = interaction.options.get('target-user');
        const target_user = interaction.options.getUser('target-user');
        const origin_user = interaction.user;

        // const target_id = '<@'+ target_user.user.id +">";
        if(origin_user.id ==  target.user.id){
            interaction.reply({
                content: ' You cannot hug yourself',
                ephemeral: true,
            });
        }
        else {
            // interaction.reply(`Hello, ${origin_user} hugged ${target_id}`);
            // const testingEmbed = new EmbedBuilder().setTitle('hug');

            console.log(target_user);
            var targetname = target.user.globalName;
            if (target.member.nickname != null){
                targetname = target.member.nickname;
            }
            if(targetname == null){
                targetname = target_user.displayName;
            }
            // console.log(target_user);
            // console.log(targetname);

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
}
    
