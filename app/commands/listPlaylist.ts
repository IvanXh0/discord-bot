import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { ChannelPlaylist } from "../models/ChannelPlaylist";
import { formatDuration, calculateTotalDuration } from "../utils/duration";

export const data = new SlashCommandBuilder()
  .setName("listplaylist")
  .setDescription("List all songs in the playlist for this channel");

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply();

  try {
    const channelId = interaction.channelId;

    const channelPlaylist = await ChannelPlaylist.findOne({ channelId });

    if (!channelPlaylist || channelPlaylist.tracks.length === 0) {
      return interaction.editReply("The playlist for this channel is empty.");
    }

    const tracks = channelPlaylist.tracks;

    const maxTracksToShow = 20;

    const trackLines = tracks.slice(0, maxTracksToShow).map((track, index) => {
      return `**${index + 1}.** [${track.title}](${track.url}) \`[${track.duration}]\``;
    });

    const totalPlaylistDurationInSeconds = calculateTotalDuration(tracks);

    const totalDurationFormatted = formatDuration(
      totalPlaylistDurationInSeconds,
    );

    const embed = new EmbedBuilder()
      .setTitle(`Playlist for ${interaction.guild?.name}`)
      .setDescription(trackLines.join("\n"))
      .setFooter({
        text:
          tracks.length > maxTracksToShow
            ? `Showing first ${maxTracksToShow} of ${tracks.length} songs | Total Duration: ${totalDurationFormatted}`
            : `Total Duration: ${totalDurationFormatted}`,
      });

    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    console.error(`Error in listplaylist command: ${(error as Error).message}`);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(
        "❌ | An error occurred while processing your request.",
      );
    } else {
      await interaction.reply(
        "❌ | An error occurred while processing your request.",
      );
    }
  }
};
