import { SlashCommandBuilder } from "@discordjs/builders";
import {
  ChatInputCommandInteraction,
  GuildMember,
  TextChannel,
} from "discord.js";
import { player } from "../init/player";
import { ChannelPlaylist } from "../models/ChannelPlaylist";

export const data = new SlashCommandBuilder()
  .setName("playplaylist")
  .setDescription("Play songs from the playlist for this channel");

export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.deferReply();

  try {
    const member = interaction.member as GuildMember;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return interaction.editReply({
        content: "❌ | You need to join a voice channel first!",
      });
    }

    const channelId = interaction.channelId;

    const channelPlaylist = await ChannelPlaylist.findOne({ channelId });

    if (!channelPlaylist || channelPlaylist.tracks.length === 0) {
      return interaction.editReply(
        "❌ | The playlist for this channel is empty.",
      );
    }

    const tracks = channelPlaylist.tracks;

    const queue = player.nodes.create(interaction.guildId!, {
      metadata: {
        channel: interaction.channel as TextChannel,
      },
      leaveOnEnd: false,
      leaveOnEmpty: false,
    });

    if (!queue.connection) {
      await queue.connect(voiceChannel);
    }

    const tracksToAdd = [];

    for (const trackData of tracks) {
      const searchResult = await player.search(trackData.url, {
        requestedBy: interaction.user,
        searchEngine: "youtubeVideo",
      });

      if (searchResult && searchResult.tracks.length > 0) {
        tracksToAdd.push(searchResult.tracks[0]);
      } else {
        console.warn(`Could not find track: ${trackData.title}`);
      }
    }

    queue.addTrack(tracksToAdd);

    if (!queue.isPlaying()) {
      await queue.node.play();
    }

    return interaction.editReply(
      `🎶 | Now playing the playlist for this channel with **${tracks.length}** songs.`,
    );
  } catch (error) {
    console.error(`Error in playplaylist command: ${(error as Error).message}`);
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
