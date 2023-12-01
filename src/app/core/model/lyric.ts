export interface Lyric {
  name: string;
  key: string;
  tempo: number;
  notes: string;
  lastEdit: string;
  noteValue: number;
  beatValue: number;
  youTubeUrl: string;
  createdByUserId: string;
  songId: string;
  lyrics: string;
  id?: string;
}

export interface AccountLyric extends Lyric {
  accountId?: string;
}

export class LyricHelper {
  static getLyricForAddOrUpdate(data: Lyric): Lyric {
    return {
      name: data.name ?? "",
      lyrics: data.lyrics ?? "",
      key: data.key ?? "",
      tempo: data.tempo ?? 120,
      notes: data.notes ?? "",
      lastEdit: data.lastEdit ?? "",
      noteValue: data.noteValue ?? 0,
      beatValue: data.beatValue ?? 0,
      youTubeUrl: data.youTubeUrl ?? "",
      songId: data.songId ?? "",
      createdByUserId: data.createdByUserId ?? "",
    };
  }
}
