import { SlashCommandBuilder } from "@discordjs/builders";
import {
  ChatInputCommandInteraction,
  GuildMember,
  TextChannel,
} from "discord.js";
import { player } from "../init/player";
import { QueryType } from "discord-player";

export const data = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Plays a song from YouTube")
  .addStringOption((option) =>
    option
      .setName("query")
      .setDescription("The song you want to play")
      .setRequired(true)
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply();

  const query = interaction.options.getString("query", true);
  const member = interaction.member as GuildMember;

  if (!member.voice.channel) {
    return interaction.followUp({
      content: "You need to join a voice channel first!",
    });
  }

  const searchResult = await player.search(query, {
    requestedBy: interaction.user,
    searchEngine: QueryType.AUTO,
  });

  if (!searchResult || !searchResult.tracks.length) {
    return interaction.followUp({ content: "No results were found!" });
  }

  const queue = await player.nodes.create(interaction.guild!, {
    metadata: interaction.channel as TextChannel,
  });

  try {
    if (!queue.connection) await queue.connect(member.voice.channel);
  } catch {
    player.nodes.delete(interaction.guildId!);
    return interaction.followUp({
      content: "Could not join your voice channel!",
    });
  }

  queue.addTrack(searchResult.tracks[0]);

  if (!queue.isPlaying) {
    await queue.node.play();
  }

  return interaction.followUp({
    content: `🎶 | Queued: **${searchResult.tracks[0].title}**`,
  });
};
