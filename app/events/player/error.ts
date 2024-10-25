import { player } from "../../init/player";
import { GuildQueue } from "discord-player";
import { TextChannel } from "discord.js";

player.events.on("error", (queue: GuildQueue, error: Error) => {
  console.error(`Error in player: ${error.message}`);
  (queue.metadata as TextChannel).send(
    `❌ | An error occurred: ${error.message}`
  );
});
