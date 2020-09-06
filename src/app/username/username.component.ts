import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { auth } from  'firebase/app';
import { User } from  'firebase';
import { AuthenticationService } from  '../authentication.service';

import * as firebase from 'firebase/app';

// Component for updating username
@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  username: string;

  constructor( db: AngularFireDatabase, 
  public  authService:  AuthenticationService ) {}
 
  ngOnInit() {}

  updateUserName() {
    var user = auth().currentUser;
    // Send to realtime AngularFireDatabase
    firebase.database().ref('users/'+user.uid).set({
      uname : this.username
    });
    this.username = '';
  }
}