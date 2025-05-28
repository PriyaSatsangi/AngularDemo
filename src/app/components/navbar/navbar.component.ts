import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators'; // ✅ RxJS operator
import { NavigationEnd } from '@angular/router'; // ✅ Router event

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showWelcomeSection: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    // alert('Logged in? ' + isLoggedIn);
    if (!isLoggedIn || isLoggedIn !== 'true') {
      this.router.navigate(['/login']);
    }
    // Set flag based on current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showWelcomeSection = event.urlAfterRedirects === '/dashboard';
    });

  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    this.router.navigate(['/login']);
  }
}
