import { player } from "../../init/player";
import { GuildQueue } from "discord-player";
import { TextChannel } from "discord.js";

player.events.on("disconnect", (queue: GuildQueue) => {
  (queue.metadata as TextChannel).send(
    "❌ | I was disconnected from the voice channel, clearing queue!"
  );
});
