import { Interaction } from "discord.js";
import { client } from "../../init/discordClient";
import { commands } from "../../commands";

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) {
    return interaction.reply({ content: "Unknown command!", ephemeral: true });
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    interaction.reply({
      content: "There was an error executing that command!",
      ephemeral: true,
    });
  }
});
