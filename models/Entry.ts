import { Entry } from "interfaces";
import mongoose, { Schema, Model } from "mongoose";

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "done", "in-progress"],
      message: "{VALUE} is not a valid status",
    },
    default: "pending",
  },
});

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
