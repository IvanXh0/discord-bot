import { Player } from "discord-player";
import { client } from "./discordClient";
import { YoutubeiExtractor } from "discord-player-youtubei";

export const player = new Player(client, {
  ytdlOptions: {
    filter: "audioonly",
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

player.extractors.register(YoutubeiExtractor, {});
