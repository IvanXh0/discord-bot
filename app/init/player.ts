import { Player } from "discord-player";
import { client } from "./discordClient";
import { YoutubeiExtractor } from "discord-player-youtubei";

export const player = new Player(client);

player.extractors.register(YoutubeiExtractor, {});
