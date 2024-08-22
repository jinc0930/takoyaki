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
        // console.log(target_userid);
        const reason = interaction.options.get('reason')?.value || "no reason provided" ;

        await interaction.deferReply();

        const target_user = await interaction.guild.members.fetch(target_userid);

        if(!target_user){
            await interaction.editReply("That user doesn't exist in this server");
            return;
        }

        if(target_user.id === interaction.guild.ownerId) {
            await interaction.editReply("You can't ban that user because they are the owner");
            return;
        }

        const targetUserRolePosition = target_user.roles.highest.position;
        const requestUserRolePosition = interaction.member.roles.highest.position;
        const botRolePosition = interaction.guild.members.me.roles.highest.position;

        //if request comes from the owner
        if (interaction.member.id === interaction.guild.ownerId) {
            try {
                await target_user.ban( {reason});
                await interaction.editReply(`User ${target_user} was banned\n Reason: ${reason} `);
            } catch (error) {
                console.log(`There was an error when banning: ${error}`);  
            }
            return;
        }

        if (targetUserRolePosition >= requestUserRolePosition){
            await interaction.editReply("You can't ban that user because they have the same/higher role than you.");
            return;
        }

        if(targetUserRolePosition >= botRolePosition){
            await interaction.editReply("I can't ban that user because they have the same/higher role than me.");
            return;
        }

        // ban the user
        try {
            await target_user.ban( {reason});
            await interaction.editReply(`User ${target_user} was banned\n Reason: ${reason} `);
        } catch (error) {
            console.log(`There was an error when banning: ${error}`);  
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