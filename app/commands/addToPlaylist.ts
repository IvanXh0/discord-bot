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
      .setDescription("Name/URL of the song")
      .setRequired(true),
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const songQuery = interaction.options.getString("song", true);
  const channelId = interaction.channelId;

  await interaction.deferReply();

  const searchResult = await player.search(songQuery, {
    requestedBy: interaction.user,
    searchEngine: "youtubeSearch",
  });

  if (!searchResult.tracks.length)
    return interaction.editReply("No results found for your query");

  const trackInfo = searchResult.tracks[0];

  const track: Track = {
    title: trackInfo.title,
    url: trackInfo.url,
    duration: trackInfo.duration,
    addedAt: new Date(),
  };

  await ChannelPlaylist.findOneAndUpdate(
    { channelId },
    { $push: { tracks: track } },
    { upsert: true, new: true },
  );

  return interaction.editReply(
    `Added ${track.title} to the playlist for this channel`,
  );
};
