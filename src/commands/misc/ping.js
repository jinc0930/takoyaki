module.exports = {
    name: 'ping',
    description: 'pong',
    // devOnly: Boolean
    // testOnly: Boolean
    // options: Object[]
    // deleted: Boolean
    
    callBack: (client, interaction) =>{
        interaction.reply(`pong ${client.ws.ping}ms`);
    },
}