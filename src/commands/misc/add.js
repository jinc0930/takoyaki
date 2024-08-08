module.exports = {
    name: 'add',
    description: 'adding numbers!!!',
    deleted: true,

    callback: (interaction) => {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        interaction.reply(`Testing options command, the sum is ${num1 + num2}`);
    }
}
