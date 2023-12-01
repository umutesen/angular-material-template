import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable, from, map, mergeMap, pipe, switchMap, take, tap } from "rxjs";
import { Lyric, LyricHelper } from "../model/lyric";
import { SongService } from "./song.service";
import { increment } from "firebase/firestore";
import { Song } from "../model/song";

@Injectable({
  providedIn: "root",
})
export class LyricsService {

  constructor(private db: AngularFirestore,
    private songService: SongService) {}

  getSongLyrics(accountId: string, songId: string): Observable<any> {
    const dbPath = `/accounts/${accountId}/songs/${songId}/lyrics`;
    const songsRef = this.db.collection(dbPath);
    return songsRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          const lyric = c.payload.doc.data() as Lyric;
          lyric.id = c.payload.doc.id;
          return lyric;
        })
      )
    );
  }

  addSongLyric(
    accountId: string,
    songId: string,
    lyric: Lyric
  ): Observable<any> {
    const lyricForAdd = LyricHelper.getLyricForAddOrUpdate(lyric);
    const dbPath = `/accounts/${accountId}/songs/${songId}/lyrics`;
    const dbSongPath = `/accounts/${accountId}/songs/${songId}`;
    const lyricsRef = this.db.collection(dbPath);
    
    //Update the count of the lyrics. 
    const songRef = this.db.doc(dbSongPath)
    songRef.valueChanges()
      .pipe(take(1))
      .subscribe((result) => {
        const song = result as Song;
        songRef.update({ countOfLyrics: song.countOfLyrics ? song.countOfLyrics + 1: 1 });
      });
    //Return the lyric
    return from(lyricsRef.add(lyricForAdd)).pipe(
      map((result) => {
        const rtnLyric = {
          id: result.id,
          ...lyric,
        };
        return rtnLyric;
      }),
    );
  }
}
