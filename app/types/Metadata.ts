import { TextChannel } from "discord.js";

export interface Metadata {
  channel: TextChannel;
  disconnectTimeout?: NodeJS.Timeout;
}
