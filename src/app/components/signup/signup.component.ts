import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  Id= 0;
  name = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  signup() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = users.some((u: any) => u.email === this.email);
    if (userExists) {
      alert('User already exists with this email.');
      return;
    }

    users.push({
      Id: this.Id,
      name: this.name,
      email: this.email,
      password: this.password,
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful!');
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
