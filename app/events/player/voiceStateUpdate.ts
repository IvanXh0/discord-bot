// src/events/client/voiceStateUpdate.ts
import { client } from "../../init/discordClient";
import { player } from "../../init/player";
import { VoiceState, VoiceChannel } from "discord.js";
import { Metadata } from "../../types/Metadata";
import { GuildQueue } from "discord-player";

client.on("voiceStateUpdate", (oldState: VoiceState, newState: VoiceState) => {
  if (newState.member?.user.bot && newState.id === client.user?.id) return;

  const queue = player.nodes.get(newState.guild.id) as GuildQueue<Metadata>;
  if (!queue || !queue.connection) return;

  const botMember = newState.guild.members.me;
  if (!botMember) return;
  const botChannel = botMember.voice.channel as VoiceChannel;
  if (!botChannel) return;

  const nonBotMembers = botChannel.members.filter((member) => !member.user.bot);
  if (nonBotMembers.size === 0) {
    const { channel, disconnectTimeout } = queue.metadata as Metadata;

    if (!disconnectTimeout) {
      queue.metadata.disconnectTimeout = setTimeout(() => {
        if (queue.connection) {
          channel.send("❌ | Nobody is in the voice channel, leaving...");
          queue.delete();
          queue.connection.disconnect();
        }
      }, 60000);
    }
  } else {
    const { disconnectTimeout } = queue.metadata as Metadata;
    if (disconnectTimeout) {
      clearTimeout(disconnectTimeout);
      queue.metadata.disconnectTimeout = undefined;
      queue.metadata.channel.send(
        "✅ | Someone joined the voice channel, disconnect timeout cleared."
      );
    }
  }
});
