import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  Id = 0;
  name = '';
  email = '';
  password = '';
  private apiUrl = 'http://localhost:3000/users';

  constructor(private router: Router, private http: HttpClient) {}

  signup() {
    // Step 1: Check if user already exists
    this.http.get<any[]>(this.apiUrl).subscribe(users => {
      const userExists = users.some(u => u.email === this.email);
      if (userExists) {
        alert('User already exists with this email.');
        return;
      }

      // Step 2: Add new user
      const newUser = {
      //  Id: Date.now(),
        name: this.name,
        email: this.email,
        password: this.password,
      };

      this.http.post(this.apiUrl, newUser).subscribe(() => {
        alert('Signup successful!');
        this.router.navigate(['/login']);
      });
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
