import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { player } from "../init/player";
import { Metadata } from "../types/Metadata";
import { GuildQueue } from "discord-player";

export const data = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("Stops the music and clears the queue");

export const execute = async (interaction: CommandInteraction) => {
  await interaction.deferReply();

  const queue = player.nodes.get(interaction.guildId!) as GuildQueue<Metadata>;

  if (!queue || !queue.isPlaying) {
    return interaction.followUp({ content: "❌ | No music is being played!" });
  }

  queue.delete();

  const { disconnectTimeout } = queue.metadata;
  if (disconnectTimeout) {
    clearTimeout(disconnectTimeout);
    queue.metadata.disconnectTimeout = undefined;
  }

  return interaction.followUp({ content: "🛑 | Stopped the player!" });
};
