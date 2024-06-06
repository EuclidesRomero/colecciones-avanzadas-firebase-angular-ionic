import { Injectable } from '@angular/core';
import {Auth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, signOut} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fAuth: Auth;


  constructor(fAuth:Auth) {
    this.fAuth = fAuth;
   }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.fAuth, email, password)
   }
   signUpUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.fAuth, email, password)
   }

   recoverPassword(passwordResetEmail: string) {
    return sendPasswordResetEmail(this.fAuth, passwordResetEmail)
   }

   logout() {
    return this.fAuth.signOut()
   }
   
   currentUser() {
    let user = this.fAuth.currentUser;
    return user;
   }
   
  }

