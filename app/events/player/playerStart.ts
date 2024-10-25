import { player } from "../../init/player";
import { GuildQueue, Track } from "discord-player";
import { TextChannel } from "discord.js";

player.events.on("playerStart", (queue: GuildQueue, track: Track) => {
  (queue.metadata as TextChannel).send(`🎶 | Now playing **${track.title}**`);
});
