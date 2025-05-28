import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from '../user/user.component';

declare var bootstrap: any;

@Component({
  selector: 'app-user-with-json',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user-with-json.component.html',
  styleUrls: ['./user-with-json.component.css'],
})
export class UserWithJsonComponent implements OnInit {
  userobj: User = new User();
  users: User[] = [];
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>('http://localhost:3000/users').subscribe({
      next: (res) => (this.users = res),
      error: (err) => console.error('Fetch failed:', err),
    });
  }

  saveUser() {
    if (this.userobj.id === 0) {
      const { id, ...newUserWithoutId } = this.userobj; // Remove id = 0
      this.http
        .post<User>('http://localhost:3000/users', newUserWithoutId)
        .subscribe({
          next: () => {
            this.getUsers();
            this.resetForm();
            this.closeModal();
          },
          error: (err) => console.error('Add failed:', err),
        });
    } else {
      this.http
        .put(`http://localhost:3000/users/${this.userobj.id}`, this.userobj)
        .subscribe({
          next: () => {
            this.getUsers();
            this.resetForm();
            this.closeModal();
          },
          error: (err) => console.error('Update failed:', err),
        });
    }
  }

  resetForm() {
    this.userobj = new User();
  }

  editUser(user: User) {
    this.userobj = { ...user };
    const modalEl = document.getElementById('myModal');
    if (modalEl) new bootstrap.Modal(modalEl).show();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http
        .delete(`http://localhost:3000/users/${id}`)
        .subscribe(() => this.getUsers());
    }
  }

  openModal() {
    const modalEl = document.getElementById('myModal');
    if (modalEl) new bootstrap.Modal(modalEl).show();
  }

  closeModal() {
    const closeBtn = document.querySelector(
      '#myModal .btn-close'
    ) as HTMLElement;
    if (closeBtn) closeBtn.click();
  }
}
