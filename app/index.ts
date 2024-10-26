import "dotenv/config";

import "./init/discordClient";
import "./init/player";
import "./events/client/ready";
import "./events/client/interactionCreate";
import "./events/player/playerStart";
import "./events/player/trackAdd";
import "./events/player/disconnect";
import "./events/player/emptyQueue";
import "./events/player/error";

import "./init/registerCommands";

import { client } from "./init/discordClient";
import { token } from "./config";
import { connectDB } from "./init/database";

connectDB();
client.login(token);
