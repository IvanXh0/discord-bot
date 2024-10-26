import { player } from "../../init/player";
import { GuildQueue } from "discord-player";
import { Metadata } from "../../types/Metadata";

player.events.on("emptyQueue", (queue: GuildQueue<Metadata>) => {
  const { channel } = queue.metadata;

  channel.send("✅ | Queue finished!");

  queue.metadata.disconnectTimeout = setTimeout(() => {
    channel.send("❌ | No more sons in the queue! Si idam brat...");
    queue.delete();
    queue.connection?.disconnect();
  }, 60000);
});
