import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { commands } from "../commands";
import { clientId, guildId, token } from "../config";

const rest = new REST({ version: "9" }).setToken(token);

const commandData = commands.map((command) => command.data.toJSON());

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commandData,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
