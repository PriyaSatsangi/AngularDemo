import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  isNewUser: boolean = true;
  userobj: User = new User();
  users: User[] = []; //UserList

  ngOnInit(): void {
    debugger;
    const localData = localStorage.getItem('users');
    if (localData != null) {
      this.users = JSON.parse(localData);
    }
  }

  changeView() {
    this.isNewUser = !this.isNewUser;
  }

  onEdit(data: User) {
    this.userobj = data;
    this.changeView();
  }

  onDelete(id: Number) {
    const isDelete = confirm('Are You sure You want to delete');
    if (isDelete) {
      const index = this.users.findIndex((m) => m.id == id);
      this.users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  onUpdate() {
    const record = this.users.find((m) => m.id == this.userobj.id);
    if (record != undefined) {
      record.email = this.userobj.email;
      record.name = this.userobj.name;
      record.password = this.userobj.password;
      record.isAggreee = this.userobj.isAggreee;
    }
    localStorage.setItem('users', JSON.stringify(this.users));
    this.changeView();
  }

  onSave() {
    this.userobj.id = this.users.length + 1;
    this.users.push(this.userobj);
    this.userobj = new User();
    localStorage.setItem('users', JSON.stringify(this.users));
    this.isNewUser = true;
    this.changeView();
  }
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  isAggreee: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.password = '';
    this.isAggreee = false;
  }
}
