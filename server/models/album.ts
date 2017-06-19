/**
 * Created by user on 19/06/2017.
 */
import { Document } from "mongoose";
import {IAlbum} from "../interfaces/album";

export interface IAlbumModel extends IAlbum, Document {
  //custom methods for your model would be defined here
}
