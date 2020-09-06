import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

// FireBase/FireStore Libraries
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {NgxPaginationModule} from 'ngx-pagination'; 
import {NgPipesModule} from 'ngx-pipes';

//FireBase Credentials
const firebaseConfig = {
  apiKey: "AIzaSyADQUMBfb2a0pM642uFzXyn2F38yccXu9U",
  authDomain: "easychat-f2728.firebaseapp.com",
  databaseURL: "https://easychat-f2728.firebaseio.com",
  projectId: "easychat-f2728",
  storageBucket: "easychat-f2728.appspot.com",
  messagingSenderId: "839409639110",
  appId: "1:839409639110:web:6eb6102eef8917f12141c7",
  measurementId: "G-W1L5TXZ7XF"
};

// Components
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { HelloComponent } from './hello.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MenuComponent } from './menu/menu.component';

//Authentication Service
import { AuthenticationService } from './authentication.service';
import { RegisterComponent } from './register/register.component';
import { UsernameComponent } from './username/username.component';
import { GifMenuComponent } from './gif-menu/gif-menu.component';
import { ReversePipe } from './reverse.pipe';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    NgxPaginationModule,
    NgPipesModule,
    RouterModule.forRoot([
    // List paths here
    { path: '', component: ChatComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'username', component: UsernameComponent},
  ]) ],
  declarations: [ 
    AppComponent,
    HelloComponent,
    ChatComponent,
    TopBarComponent,
    MenuComponent,
    RegisterComponent,
    UsernameComponent,
    GifMenuComponent,
    ReversePipe ],
  bootstrap:    [ AppComponent ],
  providers: [AuthenticationService]
})
export class AppModule { }
