
export interface Song {
  
    name: string,
    artist: string,
    genre: string,
    key: string,
    songLength: number,
    tempo: number,
    deleted: boolean,
    deprecated: boolean,
    notes: string,
    other: string,
    lastEdit: string,
    noteValue: number,
    beatValue: number,
    youTubeUrl: string,
    createdByUserId: string,
    lengthMin: number,
    lengthSec: number,
    id?: string,
    
  }

  // public static getSongLengthMinSec(SongLength: number) {
  //   return {
  //     minutes: Math.floor(SongLength / 60),
  //     seconds: SongLength % 60
  //   };
  // }
  

export class SongHelper{
  static getSongForAddOrUpdate(data: Song): Song {
      return {
         name: data.name ?? "",
         artist: data.artist ?? "",
         genre: data.genre ?? "",
         key: data.key ?? "",
         songLength: data.songLength ?? 0,
         tempo: data.tempo ?? 120,
         deleted: data.deleted ?? false,
         deprecated: data.deprecated ?? false,
         notes: data.notes ?? "",
         other: data.name ?? "",
         lastEdit: data.name ?? "",
         noteValue: data.noteValue ?? 0,
         beatValue: data.beatValue ?? 0,
         youTubeUrl: data.name ?? "",
         createdByUserId: data.name ?? "",
         lengthMin: data.lengthMin ?? 3,
         lengthSec: data.lengthSec ?? 0,
      };
    }
}