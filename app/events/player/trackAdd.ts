import { player } from "../../init/player";
import { GuildQueue, Track } from "discord-player";
import { Metadata } from "../../types/Metadata";

player.events.on(
  "audioTrackAdd",
  (queue: GuildQueue<Metadata>, track: Track) => {
    const { channel, disconnectTimeout } = queue.metadata;
    channel.send(`🎶 | Track **${track.title}** added to the queue!`);

    if (disconnectTimeout) {
      clearTimeout(disconnectTimeout);
      queue.metadata.disconnectTimeout = undefined;
    }
  }
);
