import { player } from "../../init/player";
import { GuildQueue, Track } from "discord-player";
import { Metadata } from "../../types/Metadata";

player.events.on("playerStart", (queue: GuildQueue<Metadata>, track: Track) => {
  const { channel } = queue.metadata;
  channel.send(`🎶 | Now playing **${track.title}**`);
});
