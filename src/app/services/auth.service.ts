import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, query, where, getDocs, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private firestore: Firestore) {}

  async login(email: string): Promise<void> {
    if (!email.trim()) return;
  
    const usersCollection = collection(this.firestore, 'users');
    const userQuery = query(usersCollection, where('email', '==', email));
    const snapshot = await getDocs(userQuery);
  
    if (snapshot.empty) {
      await addDoc(usersCollection, { email });
    }
  
    localStorage.setItem('userEmail', email); // ✅ Guardar email en localStorage
    this.router.navigate(['/tasks']);
  }
  
  logout() {
    localStorage.removeItem('userEmail'); // ✅ Limpiar sesión
    this.router.navigate(['/login']);
  }
}
