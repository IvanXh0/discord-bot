import { player } from "../../init/player";
import { GuildQueue } from "discord-player";
import { Metadata } from "../../types/Metadata";

player.events.on("error", (queue: GuildQueue<Metadata>, error) => {
  const { channel, disconnectTimeout } = queue.metadata;
  console.error(`Error in queue: ${error.message}`);
  channel.send(`❌ | An error occurred: ${error.message}`);

  if (disconnectTimeout) {
    clearTimeout(disconnectTimeout);
    queue.metadata.disconnectTimeout = undefined;
  }
});
