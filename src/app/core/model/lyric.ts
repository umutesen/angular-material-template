import { Timestamp } from "@angular/fire/firestore";
import { Base } from "./base";
import { BaseUser } from "./user";

export interface Lyric extends Base {
  name: string;
  key: string;
  tempo: number;
  notes: string;
  noteValue: number;
  beatValue: number;
  youTubeUrl: string;
  songId: string;
  lyrics: string;
  defaultLyric: string;
  
}

export interface AccountLyric extends Lyric {
  accountId?: string;
}

export class LyricHelper {
  static getForAdd(data: Lyric, editingUser: BaseUser): Lyric {
    const lyricForAdd = {
      ...this.getForUpdate(data, editingUser),
      dateCreated: Timestamp.fromDate(new Date()),
      createdByUser: editingUser
    };
    return lyricForAdd;
  }

  static getForUpdate(data: Lyric, editingUser: BaseUser): Lyric {
    return {
      name: data.name ?? "",
      lyrics: data.lyrics ?? "",
      key: data.key ?? "",
      tempo: data.tempo ?? 120,
      notes: data.notes ?? "",
      lastEdit: Timestamp.fromDate(new Date()),
      noteValue: data.noteValue ?? 0,
      beatValue: data.beatValue ?? 0,
      youTubeUrl: data.youTubeUrl ?? "",
      songId: data.songId ?? "",
      defaultLyric: data.defaultLyric ?? "",
      createdByUser: data.createdByUser ?? editingUser,
      dateCreated: data.dateCreated ?? Timestamp.fromDate(new Date()),
      lastUpdatedByUser: editingUser

    };
  }
}
