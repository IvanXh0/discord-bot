import mongoose, { Schema, Document } from "mongoose";

export interface Track {
  _id?: string;
  title: string;
  url: string;
  duration: string;
  addedAt: Date;
}

export interface ChannelPlaylist extends Document {
  channelId: string;
  tracks: Track[];
}

const TrackSchema = new Schema<Track>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  duration: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

const ChannelPlaylistSchema = new Schema<ChannelPlaylist>(
  {
    channelId: { type: String, required: true, unique: true },
    tracks: { type: [TrackSchema], default: [] },
  },
  {
    autoIndex: false,
  },
);

export const ChannelPlaylist = mongoose.model<ChannelPlaylist>(
  "ChannelPlaylist",
  ChannelPlaylistSchema,
);
