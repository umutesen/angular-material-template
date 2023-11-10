import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { UserRoles } from "../model/user-roles";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { User } from "../model/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private dbPath = '/users';
  userRef: AngularFirestoreCollection<User>;

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  pictureUrl$: Observable<string | null>;

  roles$: Observable<UserRoles>;

  displayName$: Observable<string | null>;
  user$: Observable<any | null>;

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private db: AngularFirestore) {
      this.userRef = db.collection(this.dbPath);
    //this.afAuth.idToken.subscribe((jwt) => console.log(jwt));
    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    this.displayName$ = afAuth.authState.pipe(
      map((user) => (user ? user.displayName : ''))
    );

    this.user$ = afAuth.authState.pipe(
      map((user) => (user ? user : ''))
    );

    this.pictureUrl$ = afAuth.authState.pipe(
      map((user) => (user ? user.photoURL : null))
    );

    this.roles$ = this.afAuth.idTokenResult.pipe(
      map((token) => <any>token?.claims ?? { admin: false })
    );
  }

  addUser(authUser: any): any {
    const userToAdd : User = {uid: authUser.uid, displayName: authUser.displayName ?? '', photoUrl: authUser.photoUrl ?? '', email: authUser.email ?? '' }
    return this.userRef.add(userToAdd);
  }

  getUser(uid: string): Observable<User>{
    return this.db
      .collection(this.dbPath, (ref) =>
        ref.where("uid", "==", uid)
      )
      .get()
      .pipe(
        map((results) =>
          results.docs.map((snap) => {
            return { id: snap.id, ...(<any>snap.data()) };
          })[0]
        )
      );
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl("/auth/login");  
  }
}
