import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  async login() {
    if (!this.email.trim()) return;
    await this.authService.login(this.email);
  }
}
