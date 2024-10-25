import { player } from "../../init/player";
import { GuildQueue, Track } from "discord-player";
import { TextChannel } from "discord.js";

player.events.on("audioTrackAdd", (queue: GuildQueue, track: Track) => {
  (queue.metadata as TextChannel).send(
    `🎶 | Track **${track.title}** added to the queue!`
  );
});
