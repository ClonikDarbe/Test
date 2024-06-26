const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "uyarı-ayar",
  description: "Uyarı ayarları",
  type: 5,
  options: [
    {
      name: "mute-rol",
      description: "Mute rolünü belirleyin",
      type: 8,
      required: true
    },
    {
      name: "jail-rol",
      description: "Jail rolünü belirleyin",
      type: 8,
      required: true
    },
    {
      name: "log-kanal",
      description: "Uyarıları kaydetmek için log kanalını belirleyin",
      type: 7,
      required: true
    }
  ],

  run: async (client, interaction) => {
    let muteRole = interaction.options.getRole("mute-rol") || interaction.guild.roles.cache.find(role => role.name === "Muted");
    let jailRole = interaction.options.getRole("jail-rol") || interaction.guild.roles.cache.find(role => role.name === "Jailed");

    const mute = interaction.options.getRole('mute-rol')
    const jail = interaction.options.getRole('jail-rol')
    const logChannel = interaction.options.getChannel("log-kanal") || interaction.guild.channels.cache.find(channel => channel.name === "logs");

    db.set(`Mute_${interaction.guild.id}`, mute.id);
    db.set(`Jail_${interaction.guild.id}`, jail.id);

    if (logChannel) {
      db.set(`logChannel_${interaction.guild.id}`, logChannel.id);
    }

    interaction.reply({ content: " ✅| Uyarı ayarları başarıyla güncellendi.", ephemeral: false });
  }
};
