import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Song } from '../model/song';
import { SetlistSong, SetlistSongHelper } from '../model/setlist-song';
import { SetlistBreak, SetlistBreakHelper } from '../model/setlist-break';

@Injectable({
  providedIn: 'root'
})
export class SetlistSongsService {

  constructor(private db: AngularFirestore) {
    
  }

  getSetlistSongs(accountId: string, setlistId: string): Observable<any> {
    const dbPath = `/accounts/${accountId}/setlists/${setlistId}/songs`;
    const songsRef = this.db.collection(dbPath, ref => ref.orderBy("sequenceNumber"));
    return songsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          {
            const song = c.payload.doc.data() as SetlistSong;
            song.id = c.payload.doc.id;
            return song;
          }
        )
      )
    );
  }

  addSetlistBreak(accountId: string, setlistId: string, setlistSong: SetlistBreak): any {
    const songForAdd = SetlistBreakHelper.getSetlistBreakForAddOrUpdate(setlistSong);
    const dbPath = `/accounts/${accountId}/setlists/${setlistId}/songs`;
    const setlistSongsRef = this.db.collection(dbPath);
    
    return setlistSongsRef.add(songForAdd);
  }

  addSetlistSong(accountId: string, setlistId: string, setlistSong: SetlistSong): any {
    const songForAdd = SetlistSongHelper.getSetlistSongForAddOrUpdate(setlistSong);
    const dbPath = `/accounts/${accountId}/setlists/${setlistId}/songs`;
    const setlistSongsRef = this.db.collection(dbPath);
    
    return setlistSongsRef.add(songForAdd);
  }
}
