import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onLogin(): void {

    const request = {

      username: this.username,
      password: this.password

    };

    this.authService.Login(request)
      .subscribe({

        next: response => {

          console.log('Login success', response);

        },

        error: error => {

          console.error('Login error', error);

        }

      });

  }
}
