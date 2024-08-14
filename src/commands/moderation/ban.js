const{ Client, Interaction,ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
const { InvalidConnectionError } = require('sequelize');

module.exports = {

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    callback: async (client, interaction) =>{
        const target_userid = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value || "no reason provided" ;

        await interaction.deferReply();

        const target_user = await interaction.guild.members.fetch(target_userid);

        if(!target_user){
            await interaction.editReply("That user doesn't exist in this server");
            return;
        }

        if(target_user.id === interaction.guild.ownerId) {
            await interaction.editReply("You can't ban that user");
            return;
        }
    },

    name: 'ban',
    description: 'ban someone!!!',
    // devOnly: Boolean
    // testOnly: Boolean
    options: [
        {
            name: 'target-user',
            description: ' the user you want to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'reason of banning',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
    
}