
import {Song, SongHelper} from './song';

export interface SetlistBreak {
   sequenceNumber: number;
   songId: string;
   isBreak: boolean;
   name: string;
}

export class SetlistBreakHelper{
   static getSetlistBreakForAddOrUpdate(data: SetlistBreak): SetlistBreak {
       return {
         sequenceNumber: data.sequenceNumber ?? 1,
          songId: data.songId ?? "",
          isBreak: data.isBreak ?? false,
          name: data.name ?? ''
       };
     }
 }