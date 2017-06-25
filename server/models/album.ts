/**
 * Created by user on 19/06/2017.
 */
import {Document, Schema} from "mongoose";
import {IAlbum} from "../interfaces/album";
import * as mongoose from "mongoose";

export const AlbumSchema: Schema = new Schema({
  createdAt: Date,
  title: String,
  subtitle: String,
  description: String,
  images: Array
});
AlbumSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});


export interface IAlbumModel extends IAlbum, Document {
  //custom methods for your model would be defined here
}

export const User = mongoose.model<IAlbum>("Album", AlbumSchema, "albuns");
