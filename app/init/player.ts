import { Player } from "discord-player";
import { client } from "./discordClient";
import { YoutubeiExtractor } from "discord-player-youtubei";

export const player = new Player(client, {
  useLegacyFFmpeg: false,
  skipFFmpeg: false,
});

player.extractors.register(YoutubeiExtractor, {
  streamOptions: {
    useClient: "IOS",
    highWaterMark: 2 * 1_024 * 1_024,
  },
});

player.extractors.loadDefault((ext) => !["YouTubeExtractor"].includes(ext));
