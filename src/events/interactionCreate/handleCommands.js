const { devs, testServer} = require('../../../config.json');
const { botPermissions } = require('../../commands/moderation/ban');
const getLocalCommands = require('../../utils/getLocalCommands');


module.exports = async(client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);   

        if(!commandObject){
            return;
        }

        if(commandObject.devOnly){
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content: "only developers are allowed to run this command",
                    ephemeral: true,
                })
                return;
            }
        }

        if(commandObject.testOnly){
            if(!interaction.guild.id === testServer){
                interaction.reply({
                    content: "this command cannot be run here",
                    ephemeral: true,
                })
                return;
            }
        }

        if(commandObject.permissionRequied?.length){
            for (const permission of commandObject.permissionRequied){
                if (!interaction.member.permission.has(permission)){
                    interaction.reply({
                        content: 'not enough permissions',
                        ephemeral: true,
                    });
                    break;
                }
            }
        }

        if(commandObject.botPermissions?.length){
            for (const permission of commandObject.botPermissions){
               const bot  = interaction.guild.members.me;

                if(!botPermissions.has(permission)){
                    interaction.reply({
                        content: "Bot does not have enough permissions",
                        ephemeral: true,
                    });
                    break;
                }
            }
        }

        await commandObject.callback(client, interaction);
        
    } catch (error) {
        console.log(`There was an error running this command ${error}`);
    }
};