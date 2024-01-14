import { Injectable } from '@angular/core';
import { from, map, Observable, of } from "rxjs";
import { Timestamp } from "@angular/fire/firestore";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Song, SongHelper } from '../model/song';
import { BaseUser } from '../model/user';
import { OrderByDirection } from 'firebase/firestore';
import { convertSnaps } from './db-utils';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private db: AngularFirestore) {
    
  }

  getSong(accountId: string, songId: string): Observable<any> {
    const dbPath = `/accounts/${accountId}/songs`;
    const songRef = this.db.collection(dbPath).doc(songId);
    return songRef.snapshotChanges().pipe(
      map((resultSong) =>
          {
            const song = resultSong.payload.data() as Song;
            song.id = songId;
            return song;
          }
      )
    );
  }

  getSongs(accountId: string, sortOrder: OrderByDirection = 'asc', pageNumber = 0, pageSize = 10): Observable<Song[]> {
    const dbPath = `/accounts/${accountId}/songs`;
    const songsRef = this.db.collection(dbPath, ref => ref.orderBy("name", sortOrder)
                                                          .limit(pageSize)
                                                          .startAfter(pageNumber * pageSize));
    return songsRef.get().pipe(
      map(results => convertSnaps<Song>(results))
    );
  }

  addSong(accountId: string, song: Song, editingUser: BaseUser): Observable<Song> {
    const songForAdd = SongHelper.getForAdd(song, editingUser);
    
    const dbPath = `/accounts/${accountId}/songs`;
    const songsRef = this.db.collection(dbPath);
    
    let save$: Observable<any>;
    save$ = from(songsRef.add(songForAdd));
    return save$.pipe(
      map((res) => {
        const rtnSong = {
          id: res.id,
          ...songForAdd,
        };
        return rtnSong;
      })
    );
  }

  updateSong(accountId: string, songId: string, song: Song, editingUser: BaseUser): Observable<void> {
    const songForUpdate = SongHelper.getForUpdate(song, editingUser);
    const dbPath = `/accounts/${accountId}/songs`;
    const songsRef = this.db.collection(dbPath);
    
    return from(songsRef.doc(songId).update(songForUpdate));
  }
}
