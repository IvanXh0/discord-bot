import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;
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

app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Health check endpoint listening on port ${port}`);
});

connectDB();
client.login(token);
