import {IPersistedModel} from "./persisted-model";
/**
 * Created by user on 19/06/2017.
 */
export interface IAlbum extends IPersistedModel{
  title?: string;
  subtitle?: string;
  description?: string;
  images?: Array<any>;
}
