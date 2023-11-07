import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { UserRoles } from "../model/user-roles";

@Injectable({
  providedIn: "root",
})
export class UserService {
  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  pictureUrl$: Observable<string | null>;

  roles$: Observable<UserRoles>;

  displayName$: Observable<string | null>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    //this.afAuth.idToken.subscribe((jwt) => console.log(jwt));
    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    this.displayName$ = afAuth.authState.pipe(
      map((user) => (user ? user.displayName : ''))
    );

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
