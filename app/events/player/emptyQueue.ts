import { player } from "../../init/player";
import { GuildQueue } from "discord-player";
import { TextChannel } from "discord.js";

player.events.on("emptyQueue", (queue: GuildQueue) => {
  (queue.metadata as TextChannel).send("✅ | Queue finished!");
});
