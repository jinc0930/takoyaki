const { InteractionCollector, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const { description } = require("./hug");


module.exports = {
    name: 'flip',
    description: 'flippin a coin',

    //more edits to come 
    callback: (client, interaction) => {
        const origin_user = interaction.user;
        let file = new AttachmentBuilder('./assets/coinflip.gif');

        const Embed = new EmbedBuilder()
                .setTitle(`Flipping a coin...`)
                .setImage('attachment://coinflip.gif');
            
        interaction.reply({embeds: [Embed], files: [file]});
    }
    
}
