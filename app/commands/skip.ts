import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { player } from "../init/player";

export const data = new SlashCommandBuilder()
  .setName("skip")
  .setDescription("Skips the currently playing song");

export const execute = async (interaction: CommandInteraction) => {
  await interaction.deferReply();

  const queue = player.nodes.get(interaction.guildId!);

  if (!queue || !queue.isPlaying) {
    return interaction.followUp({ content: "❌ | No music is being played!" });
  }

  const currentTrack = queue.currentTrack;
  const success = queue.node.skip();

  return interaction.followUp({
    content: success
      ? `✅ | Skipped **${currentTrack?.title}**!`
      : "❌ | Something went wrong!",
  });
};
