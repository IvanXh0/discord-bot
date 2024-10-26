import { player } from "../../init/player";
import { GuildQueue } from "discord-player";
import { Metadata } from "../../types/Metadata";

player.events.on("disconnect", (queue: GuildQueue<Metadata>) => {
  const { channel, disconnectTimeout } = queue.metadata;
  channel.send(
    "❌ | I was disconnected from the voice channel, clearing queue and timeouts!"
  );

  if (disconnectTimeout) {
    clearTimeout(disconnectTimeout);
    queue.metadata.disconnectTimeout = undefined;
  }
});
