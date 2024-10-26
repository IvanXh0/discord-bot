import { SlashCommandBuilder } from "@discordjs/builders";
import {
  ChatInputCommandInteraction,
  GuildMember,
  TextChannel,
} from "discord.js";
import { player } from "../init/player";

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
      ephemeral: true,
    });
  }

  try {
    const result = await player.play(member.voice.channel, query, {
      nodeOptions: {
        metadata: {
          channel: interaction.channel as TextChannel,
        },
        leaveOnEnd: false,
        leaveOnStop: false,
        leaveOnEmpty: false,
      },
    });

    const track = result.track;

    return interaction.followUp({
      content: `🎶 | Now playing: **${track.title}**`,
    });
  } catch (error) {
    console.error(`Error playing track: ${(error as Error).message}`);
    return interaction.followUp({
      content: `❌ | There was an error while trying to play the track: ${
        (error as Error).message
      }`,
    });
  }
};
