import { client } from "../../init/discordClient";

client.once("ready", () => {
  console.log(`Bot is online! Logged in as ${client.user?.tag}`);
  client.user?.setActivity({
    name: "🎶 | Music Time",
    type: 2,
  });
});
