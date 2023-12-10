
import {Song, SongHelper} from './song';
import { BaseUser } from './user';

export interface SetlistSong extends Song {
   sequenceNumber: number;
   songId: string;
   isBreak: boolean;
}

export class SetlistSongHelper{
   static getForUpdate(setlistSong: SetlistSong, userUpdating: BaseUser): SetlistSong {
       return {
         sequenceNumber: setlistSong.sequenceNumber ?? 1,
          songId: setlistSong.songId ?? "",
          isBreak: setlistSong.isBreak ?? false,
          ...SongHelper.getForUpdate(setlistSong, userUpdating)
       };
     }
 }