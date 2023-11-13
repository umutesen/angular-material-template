import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay, map } from "rxjs/operators";
import * as jwt_decode from "jwt-decode";
import * as moment from "moment";

import { environment } from "../../../environments/environment";
import { of, EMPTY, Observable } from "rxjs";
import { UserRoles } from "../model/user-roles";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  pictureUrl$: Observable<string | null>;

  roles$: Observable<UserRoles>;

  displayName$: Observable<string | null>;

  user$: Observable<any | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {
    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    this.displayName$ = afAuth.authState.pipe(
      map((user) => (user ? user.displayName : ""))
    );

    this.user$ = afAuth.authState.pipe(map((user) => (user ? user : "")));

    this.pictureUrl$ = afAuth.authState.pipe(
      map((user) => (user ? user.photoURL : null))
    );

    this.roles$ = this.afAuth.idTokenResult.pipe(
      map((token) => <any>token?.claims ?? { admin: false })
    );
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl("/auth/login");  
  }
}
