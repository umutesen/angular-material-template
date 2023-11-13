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
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          data.id = a.payload.doc.id;
          return <Account>data;
        })));
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
      map(changes =>
        changes.map(c =>
          {
            const user = c.payload.doc.data() as User;
            user.uid = c.payload.doc.id;
            return user;
          }
        )
      )
    );
 }

  addUserToAccount(account: Account, user: User) {
    const accountUserRef = this.accountsRef
      .doc(account.id)
      .collection("/users");

    accountUserRef.add(user);
    account.users?.push(user.uid);
    
    if(account.id){
      this.updateAccount(account.id, account);
    }
  }

  // create(account: Account): any {
  //   //return this.accountsRef.add({ ...account });
  // }

  // update(id: string, data: any): Promise<void> {
  //   //return this.accountsRef.doc(id).update(data);
  // }

  // delete(id: string): Promise<void> {
  //   //return this.accountsRef.doc(id).delete();
  // }
  /*getAccounts(): Observable<Account[]> {
    return from(this.getAccountsInternal());
    // get a reference to the user-profile collection
    //const accountsCollection = collection(this.firestore, 'accounts');

    // get documents (data) from the collection using collectionData
    //return collectionData(accountsCollection) as Observable<Account[]>;
  }

  // private async getAccountsInternal() {
    
  //   return (
  //     await getDocs(query(collection(this.firestore, this.collection), where("name", "!=", "")))
  //   ).docs.map((accounts) => {
  //     const docData = accounts.data();
  //     const account = {} as Account;
  //     account.name = docData['name'];
  //     account.docId = accounts.id;
  //     return account;
  //   });
  // }*/
}
