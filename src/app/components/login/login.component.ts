import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  // login() {
  //   const users = JSON.parse(localStorage.getItem('users') || '[]');

  //   const matchedUser = users.find(
  //     (u: any) => u.email === this.email && u.password === this.password
  //   );

  //   if (matchedUser) {
  //     alert('Login successful!');
  //     localStorage.setItem('isLoggedIn', 'true');
  //     // this.router.navigate(['/dashboard']);
  //     // You could store a login session here
  //     this.router.navigate(['/dashboard']);
  //   } else {
  //     alert('Invalid email or password.');
  //   }
  // }

  login() {
    this.http.get<any[]>('http://localhost:3000/users').subscribe({
      next: (users) => {
        const matchedUser = users.find(
          (u) => u.email === this.email && u.password === this.password
        );

        if (matchedUser) {
          alert('Login successful!');
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid email or password.');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Something went wrong. Please try again.');
      },
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
