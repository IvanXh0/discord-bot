import { Player } from "discord-player";
import { client } from "./discordClient";
import { YoutubeiExtractor } from "discord-player-youtubei";
import play from "play-dl";

play.setToken({
  useragent: [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  ],
});

export const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
    dlChunkSize: 0,
  },
  skipFFmpeg: false,
});

player.extractors.loadDefault();

player.extractors.register(YoutubeiExtractor, {});
