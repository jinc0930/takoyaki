const { ApplicationCommandOptionType,AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'flowers',
    description: 'send someone flowers',
    options: [
        {
            name: 'target-user',
            description: 'the user you want to send to',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
    ],

    callback: async (client, interaction) =>{
        const target = interaction.options.get('target-user');
        const target_user = interaction.options.getUser('target-user');
        const origin_user = interaction.user;

        const target_id = '<@'+ target.user.id +">";
   
        var targetname = target_user.displayName;

        //getting origin user's guild name
        const originname = interaction.member.displayName;
        let file = new AttachmentBuilder('./assets/flowers.gif');

        // const embed = new EmbedBuilder()
        //     .setTitle(`${originname} send flowers to ${targetname}`)
        //     .setImage('attachment://flowers.gif');
        
        // interaction.reply({embeds: [embed], files: [file]});
        interaction.reply( {content:`${target_id}, ${originname} sent you flowers!`, files:[file]});
        
    }
}
    
