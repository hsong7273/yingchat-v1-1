import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from  '../authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { auth } from  'firebase/app';
import { User } from  'firebase';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  user: Observable<firebase.User>; 

  register() {
    this.authService.register(this.email,this.password);
    //Reset variables
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email,this.password);
    // Reset variables
    this.email = this.password =  '';
  }

  logout() {
    this.authService.logout();
  }

  constructor(public  authService:  AuthenticationService) {}
  ngOnInit() {}
}