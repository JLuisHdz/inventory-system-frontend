import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(
  private authService: AuthService,
  private router: Router
) {}

  onLogin(): void {

    const request = {

      username: this.username,
      password: this.password

    };

    this.authService.Login(request)
      .subscribe({

        next: response => {

        this.router.navigate(['/dashboard']);

      },

        error: error => {

          console.error('Login error', error);

        }

      });

  }
}
