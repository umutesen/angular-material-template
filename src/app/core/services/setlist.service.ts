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
import { Setlist } from '../model/setlist';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class SetlistService {

  constructor(private db: AngularFirestore) { }


  getSetlists(accountId: string): Observable<any> {
    const dbPath = `/accounts/${accountId}/setlists`;
    const setlistsRef = this.db.collection(dbPath);
    return setlistsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          {
            const setlist = c.payload.doc.data() as Setlist;
            setlist.id = c.payload.doc.id;
            return setlist;
          }
        )
      )
    );
  }

  addSetlist(accountId: string, setlist: Setlist): any {
    delete setlist.id;
    const dbPath = `/accounts/${accountId}/setlists`;
    const setlistsRef = this.db.collection(dbPath);
    
    return setlistsRef.add(setlist);
  }

  updateSetlist(accountId: string, setlistId: string, setlist: Setlist): Observable<void> {
    delete setlist.id;
    const dbPath = `/accounts/${accountId}/setlists`;
    const setlistsRef = this.db.collection(dbPath);
    
    return from(setlistsRef.doc(setlistId).update(setlist));
  }
}
