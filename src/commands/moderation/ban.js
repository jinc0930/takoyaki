const{ ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'ban someone',
    // devOnly: Boolean
    // testOnly: Boolean
    options: [
        {
            name: 'target-user',
            description: 'the user you want to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'the reason for banning',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],

    callBack: (client, interaction) =>{
        interaction.reply(`ban..`);
    },
}