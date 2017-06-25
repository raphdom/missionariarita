/**
 * Created by user on 24/06/2017.
 */
import {Document} from "mongoose";

export interface IPersistedModel extends Document {
  _id: any;
}
