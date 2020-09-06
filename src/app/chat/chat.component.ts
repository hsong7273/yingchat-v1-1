import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Message } from './messages';

import { auth } from  'firebase/app';
import { User } from  'firebase';

import * as firebase from 'firebase/app';
import { AuthenticationService } from  '../authentication.service';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  newMessage: Message;
  itemsRef: AngularFireList<any>;
  messages: Observable<any[]>;
  page: number = 0;
  pageSize: number = 4;

  constructor( db: AngularFireDatabase,
  public authService: AuthenticationService ) {
    this.itemsRef = db.list('messages');
    this.messages = db.list('messages').valueChanges();
    
  }

  ngOnInit() {
    this.newMessage = new Message();
  }

  loadMore() {
    this.pageSize += 2;
  }

  addItem() {
    var user = auth().currentUser;

    var unameRef = firebase.database().ref('users/'+user.uid);
    var test = unameRef.on('value', (snapshot) => {
      var uname = snapshot.val().uname;
      // console.log(uname)
      this.newMessage.author = uname;
      this.newMessage.date = String(new Date());
      this.itemsRef.push( this.newMessage );
      this.newMessage.text = '';
    })
  }
}
