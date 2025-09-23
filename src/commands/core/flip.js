const { AttachmentBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "flip",
    description: "Flip a coin",

    callback: async (client, interaction) => {
        const flipGif = new AttachmentBuilder("./assets/flip_coin.gif");
        const flippingEmbed = new EmbedBuilder()
            .setTitle("Flipping a coin...")
            .setImage("attachment://flip_coin.gif");

        await interaction.reply({ embeds: [flippingEmbed], files: [flipGif] });

        await new Promise((resolve) => setTimeout(resolve, 5000));

        const result = Math.random() < 0.5 ? "Heads" : "Tails";
        const resultFile = new AttachmentBuilder(`./assets/${result.toLowerCase()}.png`);
        const resultEmbed = new EmbedBuilder()
            .setTitle(`🪙 The coin landed on **${result}**!`)
            .setImage(`attachment://${resultFile.name}`)
            .setColor(result === "Heads" ? 0xFFD700 : 0x808080);

        await interaction.editReply({ embeds: [resultEmbed], files: [resultFile] });
    },
};
