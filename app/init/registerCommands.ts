// src/scripts/registerCommands.ts
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { commands } from "../commands";
import { clientId, token, guildId } from "../config";

const rest = new REST({ version: "9" }).setToken(token);

const commandData = commands.map((command) => command.data.toJSON());

const isDevelopment = process.env.NODE_ENV !== "production";

(async () => {
  try {
    if (isDevelopment && guildId) {
      console.log(
        "Started refreshing application (/) commands for development guild.",
      );

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commandData,
      });

      console.log(
        "Successfully reloaded application (/) commands for development guild.",
      );
    } else {
      console.log("Started refreshing application (/) commands globally.");

      await rest.put(Routes.applicationCommands(clientId), {
        body: commandData,
      });

      console.log("Successfully reloaded application (/) commands globally.");
    }
  } catch (error) {
    console.error(error);
  }
})();
