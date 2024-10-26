import { player } from "../../init/player";
import { GuildQueue, Track } from "discord-player";
import { Metadata } from "../../types/Metadata";

player.events.on(
  "audioTracksAdd",
  (queue: GuildQueue<Metadata>, tracks: Track[]) => {
    const { channel, disconnectTimeout } = queue.metadata;

    channel.send(`🎶 | **${tracks.length}** tracks added to the queue!`);

    if (disconnectTimeout) {
      clearTimeout(disconnectTimeout);
      queue.metadata.disconnectTimeout = undefined;
    }
  },
);
