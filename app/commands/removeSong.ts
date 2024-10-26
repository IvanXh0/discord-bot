import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { ChannelPlaylist } from "../models/ChannelPlaylist";

export const data = new SlashCommandBuilder()
  .setName("removesong")
  .setDescription("Remove a song from the playlist for this channel")
  .addIntegerOption((option) =>
    option
      .setName("position")
      .setDescription(
        "Position of the song in the playlist (e.g., 1 for the first song)",
      )
      .setRequired(false),
  )
  .addStringOption((option) =>
    option
      .setName("title")
      .setDescription("Title of the song to remove")
      .setRequired(false),
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply();

  try {
    const channelId = interaction.channelId;
    const position = interaction.options.getInteger("position");
    const title = interaction.options.getString("title");

    if (!position && !title) {
      return interaction.editReply(
        "❌ | You must provide either a position or a title to remove a song.",
      );
    }

    const channelPlaylist = await ChannelPlaylist.findOne({ channelId });

    if (!channelPlaylist || channelPlaylist.tracks.length === 0) {
      return interaction.editReply(
        "❌ | The playlist for this channel is empty.",
      );
    }

    let trackToRemove;

    if (position) {
      if (position < 1 || position > channelPlaylist.tracks.length) {
        return interaction.editReply(
          `❌ | Position must be between 1 and ${channelPlaylist.tracks.length}.`,
        );
      }

      trackToRemove = channelPlaylist.tracks[position - 1];
    } else if (title) {
      trackToRemove = channelPlaylist.tracks.find((track) =>
        track.title.toLowerCase().includes(title.toLowerCase()),
      );

      if (!trackToRemove) {
        return interaction.editReply(
          `❌ | No song with the title "${title}" found in the playlist.`,
        );
      }
    }

    if (!trackToRemove) {
      return interaction.editReply(
        "❌ | Could not find the specified song in the playlist.",
      );
    }

    await ChannelPlaylist.updateOne(
      { channelId },
      { $pull: { tracks: { _id: trackToRemove._id } } },
    );

    return interaction.editReply(
      `✅ | Removed **${trackToRemove.title}** from the playlist.`,
    );
  } catch (error) {
    console.error(`Error in removesong command: ${(error as Error).message}`);
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
