import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { player } from "../init/player";
import { ChannelPlaylist, Track } from "../models/ChannelPlaylist";

export const data = new SlashCommandBuilder()
  .setName("addtoplaylist")
  .setDescription("Add a song to the playlist")
  .addStringOption((option) =>
    option
      .setName("song")
      .setDescription(
        "Name/URL of the song | press enter to add currently playing song",
      )
      .setRequired(false),
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply();

  try {
    const songQuery = interaction.options.getString("song");
    const channelId = interaction.channelId;

    let trackInfo;

    if (songQuery) {
      const searchResult = await player.search(songQuery, {
        requestedBy: interaction.user,
        searchEngine: "youtubeSearch",
      });

      if (!searchResult || !searchResult.tracks.length) {
        return interaction.editReply("❌ | No results found for your query.");
      }

      trackInfo = searchResult.tracks[0];
    } else {
      const queue = player.nodes.get(interaction.guildId!);

      if (!queue || !queue.currentTrack) {
        return interaction.editReply(
          "❌ | There is no song currently playing.",
        );
      }

      trackInfo = queue.currentTrack;
    }

    const track: Track = {
      title: trackInfo.title,
      url: trackInfo.url,
      duration: trackInfo.duration,
      addedAt: new Date(),
    };

    const channelPlaylist = await ChannelPlaylist.findOne({ channelId });

    const songExists = channelPlaylist?.tracks?.some(
      ({ url }) => url === track.url,
    );

    if (songExists) {
      return interaction.editReply(
        `⚠️ | **${track.title}** is already in the playlist for this channel.`,
      );
    }

    await ChannelPlaylist.findOneAndUpdate(
      { channelId },
      { $push: { tracks: track } },
      { upsert: true, new: true },
    );

    return interaction.editReply(
      `✅ | Added **${track.title}** to the playlist for this channel.`,
    );
  } catch (error) {
    console.error(
      `Error in addtoplaylist command: ${(error as Error).message}`,
    );
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
