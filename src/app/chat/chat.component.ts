import { Component, OnInit } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable } from "rxjs";
import { Message, MessageType } from "./messages";
import { AngularFireAuth } from  "@angular/fire/auth";

import { auth } from "firebase/app";
import { User } from "firebase";

import * as firebase from "firebase/app";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})

export class ChatComponent implements OnInit {
  public MessageTypeEnum = MessageType;
  newMessage: Message;
  itemsRef: AngularFireList<any>;
  messages: Observable<any[]>;
  page: number = 0;
  pageSize: number = 4;

  constructor(
    db: AngularFireDatabase,
    public authService: AuthenticationService,
    private afAuth: AngularFireAuth) {
    this.itemsRef = db.list("messages");
    this.messages = db.list("messages").valueChanges();
  }

  ngOnInit() {
    this.newMessage = new Message();
  }

  loadMore() {
    this.pageSize += 2;
  }

  addItem() {
    // this.afAuth.authState.switchMap(auth => {
    //   if (auth) {
    //     this.currentUser = new User(auth)
    //     return this.db.object(`/users/${auth.uid}`)
    //   } else return [];
    // }).subscribe(user => {
    //   this.currentUser['username'] = user.username
    // })
    var user = auth().currentUser;
    var unameRef = firebase.database().ref('users/'+user.uid);
    var test = unameRef.on('value', (snapshot)=> {
      var uname = snapshot.val().uname;
      this.newMessage.author = uname;
      this.newMessage.date = String(new Date());

      if (this.newMessage.text.match(/^@Sticker.*$/)) {
        this.newMessage.type = MessageType.Gif;
      } else {
        this.newMessage.type = MessageType.Text;
      }

      this.itemsRef.push(this.newMessage);
      this.newMessage.text = "";
    })
  }

  getGifPath(sticker: string): string {
    return `https://raw.githubusercontent.com/hsong7273/yingchat-v1-1/master/src/app/assets/${sticker.slice(
      1
    )}.gif`;
  }
}
