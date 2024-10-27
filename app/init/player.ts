import { Player } from "discord-player";
import { client } from "./discordClient";
// import { YoutubeiExtractor } from "discord-player-youtubei";

export const player = new Player(client, {
  skipFFmpeg: false,
  ytdlOptions: {
    requestOptions: {
      headers: {
        cookie: process.env.YT_ACCESS_TOKEN,
      },
    },
  },
});

player.extractors.loadDefault();
