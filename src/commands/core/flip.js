const {  AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'flip',
    description: 'flippin a coin',

    // //more edits to come 
    callback: async (interaction) => {
        // const num = interaction.options.get('number');
        const origin_user = interaction.user;
        let file = new AttachmentBuilder('./assets/coinflip.gif');

        const Embed = new EmbedBuilder()
            .setTitle(`Flipping a coin...`)
            .setImage('attachment://coinflip.gif');
            
        interaction.reply({embeds: [Embed], files: [file]});
        
        // const reply = await interaction.fetchReply();
        // awaitinteraction.editReply({ content: "testing"});
    }
    
}
