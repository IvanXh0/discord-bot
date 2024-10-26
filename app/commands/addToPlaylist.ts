import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

const songs = [];

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
  const songQuery = interaction.options.getString("song");
  console.log(songQuery);

  const userId = interaction.user.id;

  console.log(userId);

  if (songQuery) songs.push(songQuery);
};
