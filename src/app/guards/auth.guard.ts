import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private firestore: Firestore) {}

  async canActivate(): Promise<boolean> {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      this.router.navigate(['/login']);
      return false;
    }

    const usersCollection = collection(this.firestore, 'users');
    const userQuery = query(usersCollection, where('email', '==', userEmail));
    const snapshot = await getDocs(userQuery);

    if (!snapshot.empty) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
