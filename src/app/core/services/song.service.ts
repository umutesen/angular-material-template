import { Injectable } from '@angular/core';
import { from, map, Observable, of } from "rxjs";
import {
  Firestore,
  collectionData,
  collection,
  getDocs,
  query,
  where,
  doc,
  DocumentReference,
} from "@angular/fire/firestore";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Song, SongHelper } from '../model/song';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private db: AngularFirestore) {
    
  }

  getSongs(accountId: string): Observable<any> {
    const dbPath = `/accounts/${accountId}/songs`;
    const songsRef = this.db.collection(dbPath);
    return songsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          {
            const song = c.payload.doc.data() as Song;
            song.id = c.payload.doc.id;
            return song;
          }
        )
      )
    );
  }

  addSong(accountId: string, song: Song): any {
    const songForAdd = SongHelper.getSongForAddOrUpdate(song);
    const dbPath = `/accounts/${accountId}/songs`;
    const songsRef = this.db.collection(dbPath);
    
    return songsRef.add(songForAdd);
  }

  updateSong(accountId: string, songId: string, song: Song): Observable<void> {
    delete song.id;
    const dbPath = `/accounts/${accountId}/songs`;
    const songsRef = this.db.collection(dbPath);
    
    song.artist = song.artist || '';
    song.genre = song.genre || '';
    song.key = song.key || '';
    
    return from(songsRef.doc(songId).update(song));
  }
}
