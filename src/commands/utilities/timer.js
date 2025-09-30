const ms = require("ms");
const MAX_DELAY = 2_147_483_647;

module.exports = {
    name: "remindme",
    description: "Set up a timed reminder",
    options: [
        {
            name: "time",
            description: "How long until I remind you? (e.g. 10m, 2h, 1d)",
            type: 3,
            required: true,
        },
        {
            name: "task",
            description: "What should I remind you about?",
            type: 3,
            required: true,
        },
    ],

    callback: async (client, interaction) => {
        const timeInput = interaction.options.getString("time");
        const task = interaction.options.getString("task");
        const userId = interaction.user.id;

        const delay = ms(timeInput);
        if (!delay || delay < 1000) {
            return interaction.reply({
                content: " Please provide a valid time (e.g. `10m`, `2h`, `1d`).",
                flags: InteractionResponseFlags.Ephemeral,
            });
        }
        if (delay > MAX_DELAY) {
            return interaction.reply({
                content: `The maximum reminder time is ~24.8 days. Please choose a shorter duration.`,
                flags: InteractionResponseFlags.Ephemeral,
            });
        }

        await interaction.reply(
            `🙆🏻 I'll remind <@${userId}> in **${timeInput}** to: ${task}`
        );

        setTimeout(() => {
            interaction.followUp({
                content: `⌛ <@${userId}>, this is your reminder to ${task} (It's been ${timeInput}!)`,
            });
        }, delay);
    },
};
