import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Message, MessageType } from '../chat/messages';

import { auth } from  'firebase/app';
import { User } from  'firebase';

import * as firebase from 'firebase/app';
import { AuthenticationService } from  '../authentication.service';

@Component({
  selector: 'app-gif-menu',
  templateUrl: './gif-menu.component.html',
  styleUrls: ['./gif-menu.component.css']
})

export class GifMenuComponent implements OnInit {
  newMessage: Message;
  itemsRef: AngularFireList<any>;
  messages: Observable<any[]>;
  page: number = 0;
  pageSize: number = 24;
  //number of stickers
  stickers:number[] = new Array(48)

  constructor( db: AngularFireDatabase,
  public authService: AuthenticationService ) {
    this.itemsRef = db.list('messages');
    this.messages = db.list('messages').valueChanges();
    for (var i = 0; i < this.stickers.length; i++){
      this.stickers[i] = i+1;
    }
   }

  ngOnInit() {
    this.newMessage = new Message();
    console.log(this.stickers)
  }

  // Want to split the GIFs into groups of 12
  // Want to use html loop index for group number
  // In code display 24 at once
  sendSticker(stickerID: string) {
    var user = auth().currentUser;
    var unameRef = firebase.database().ref('users/'+user.uid);
    var test = unameRef.on('value', (snapshot)=> {
      var uname = snapshot.val().uname;
      this.newMessage.author = uname;
      this.newMessage.date = String(new Date());
      this.newMessage.text = "@Sticker_"+stickerID;
      this.newMessage.type = MessageType.Gif;
      this.itemsRef.push( this.newMessage );
    })
  }

  getGifPath(sticker: string): string {
    return `https://raw.githubusercontent.com/hsong7273/yingstickers/master/stickers/${sticker.slice(
      1
    )}.gif`;
  }
}