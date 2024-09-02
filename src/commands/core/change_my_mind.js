const {
  ApplicationCommandOptionType,
  AttachmentBuilder,
} = require("discord.js");

const { changeMyMind } = require("../../utils/canvas");

module.exports = {
  name: "change_my_mind",
  description: 'create a "change my mind" meme',
  options: [
    {
      name: "text",
      description: "your text",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],

  /**
   * @param {import("discord.js").ChatInputCommandInteraction} interaction
   */
  callback: async (client, interaction) => {
    await interaction.deferReply();
    let text = interaction.options.get("text").value;
    
    const avatar = interaction.user.displayAvatarURL({ options: "png" });
    const img = await changeMyMind(avatar, text);
    const file = new AttachmentBuilder(img, { name: "change_my_mind.png" });
    interaction.editReply({ files: [file] });
  },
};
