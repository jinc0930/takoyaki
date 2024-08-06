const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'hug',
    description: 'hug someone',

    callback: async(client, interaction) =>{
        if (!interaction.isChatInputCommand()) return;

        const target_user = interaction.options.get('target-user');
        const origin_user = interaction.user;

        const target_id = '<@'+ target_user.user.id +">";
        if(origin_user.id ==  target_user.user.id){
            interaction.reply({
                content: ' You cannot hug yourself',
                ephemeral: true,
            });
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
}
    
