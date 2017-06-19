/**
 * Created by user on 19/06/2017.
 */
import { Model } from "mongoose";
import {IAlbumModel} from "./album";

export interface IModel {
  album?: Model<IAlbumModel>;
}
