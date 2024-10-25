import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { player } from "../init/player";

export const data = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("Stops the music and clears the queue");

export const execute = async (interaction: CommandInteraction) => {
  await interaction.deferReply();

  const queue = player.nodes.get(interaction.guildId!);

  if (!queue || !queue.isPlaying) {
    return interaction.followUp({ content: "❌ | No music is being played!" });
  }

  queue.delete();

  return interaction.followUp({ content: "🛑 | Stopped the player!" });
};
