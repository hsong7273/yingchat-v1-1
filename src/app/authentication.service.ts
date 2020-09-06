import { Injectable } from  '@angular/core';
import { Router } from  "@angular/router";
import { Observable } from 'rxjs';

import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';

@Injectable({
    providedIn:  'root'
})
export  class  AuthenticationService {
  user: Observable<firebase.User>;  

  constructor( private afAuth: AngularFireAuth ) {
    this.user = afAuth.authState;
  }

  register(email: string, password: string) {
  this.afAuth.createUserWithEmailAndPassword(email, password).then(value => {
    console.log('Success!', value);
  })
  .catch(err => {
    console.log('Something went wrong:', err.message);
  })
  }

  login(this, email: string, password: string) {
    auth().setPersistence(auth.Auth.Persistence.LOCAL).then(function(){
      this.afAuth.signInWithEmailAndPassword(email, password).then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
      console.log('Something went wrong:',err.message);
      });
    });
  }

 logout() {
    this.afAuth.signOut();
  }
}
