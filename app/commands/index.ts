import { Collection } from "discord.js";
import * as playCommand from "./play";
import * as skipCommand from "./skip";
import * as stopCommand from "./stop";
import * as addToPlaylistCommand from "./addToPlaylist";
import * as listPlaylistCommand from "./listPlaylist";

export const commands = new Collection();

commands.set(playCommand.data.name, playCommand);
commands.set(skipCommand.data.name, skipCommand);
commands.set(stopCommand.data.name, stopCommand);
commands.set(addToPlaylistCommand.data.name, addToPlaylistCommand);
commands.set(listPlaylistCommand.data.name, listPlaylistCommand);
