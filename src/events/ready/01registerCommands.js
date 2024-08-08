const {testServer} = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async(client) =>{
    try {
        const localCommands = getLocalCommands();
        // console.log(localCommands);
        const applicationCommands = await getApplicationCommands(client, testServer);

        for (const localCommand of localCommands){
            const {name, description, options} = localCommand;

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if(existingCommand){
                console.log(`on this command ${name}`);
                if(localCommand.deleted){
                    await applicationCommands.delete(existingCommand.id);
                    console.log(`Deleted command "${name}.`);
                    continue;
                }

                if(areCommandsDifferent(existingCommand, localCommand)){
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });
                    console.log(`Editted command "${name}.`)
                    continue;
                }
            }
            else {
                if (localCommand.deleted){
                    console.log(`skipping this command "${name}`);
                    continue;
                }
                else {
                    await applicationCommands.create({
                        name,
                        description,
                        options,
                    });
    
                    console.log(`Registering command "${name}."`);
                }
            }
        }
    } catch (error) {
        console.log(`There was an error : ${error}`);
    }
};