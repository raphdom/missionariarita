/**
 * Created by user on 19/06/2017.
 */
import { Schema } from "mongoose";

export var albumSchema: Schema = new Schema({
  createdAt: Date,
  title: String,
  subtitle: String,
  description: String,
  images: Array
});
albumSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});
