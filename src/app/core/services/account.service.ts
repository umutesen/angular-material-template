import { inject, Injectable } from "@angular/core";
import { from, map, Observable, of, pipe } from "rxjs";
import { Account } from "../model/account";
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
import { SAMPLE_SONGS } from "../model/sampleSongs";

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/compat/firestore";
import { User } from "../model/user";

//import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private collection = "accounts";

  private dbPath = "/accounts";

  accountsRef: AngularFirestoreCollection<Account>;

  constructor(private db: AngularFirestore) {
    this.accountsRef = db.collection(this.dbPath);
  }

  getAccounts(userId: string): Observable<Account[]> {
    return this.db
      .collection(this.dbPath, (ref) =>
        ref.where("users", "array-contains", userId)
      )
      .stateChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return <Account>data;
          })
        )
      );
  }

  addAccount(data: Account): any {
    delete data.id;
    if (!data.description) {
      delete data.description;
    }

    return this.accountsRef.add(data);
  }

  updateAccount(id: string, data: Account): Observable<void> {
    delete data.id;
    if (!data.description) {
      data.description = "";
    }

    return from(this.accountsRef.doc(id).update(data));
  }

  addSongsToAccount(account: Account) {
    const accountSongsRef = this.accountsRef
      .doc(account.id)
      .collection("/songs");
    accountSongsRef.add(SAMPLE_SONGS[0]);
    accountSongsRef.add(SAMPLE_SONGS[1]);
  }

  getAccountUsers(accountId: string): Observable<User[]> {
    const dbPath = `/accounts/${accountId}/users`;
    const usersRef = this.db.collection(dbPath);
    return usersRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => {
          const user = c.payload.doc.data() as User;
          user.id = c.payload.doc.id;
          return user;
        })
      )
    );
  }

  addUserToAccount(account: Account, user: User) {
    delete user.id;
    const accountUserRef = this.accountsRef
      .doc(account.id)
      .collection("/users");

    accountUserRef.add(user);
    account.users?.push(user.uid);

    if (account.id) {
      this.updateAccount(account.id, account);
    }
  }

  removeUserFromAccount(account: Account, user: User) {
    const accountUsersRef = this.accountsRef
      .doc(account.id)
      .collection("/users");

    //delete the user from the collection in the account.
    accountUsersRef.doc(user.id).delete();

    //Remove the uid from the users array on the account.
    if (account.id) {
      const uidIndex = account.users?.indexOf(user.uid);
      if (uidIndex && uidIndex > -1) {
        // only splice array when item is found
        account.users?.splice(uidIndex, 1); // 2nd parameter means remove one item only
      }
      this.updateAccount(account.id, account);
    }
  }
}
