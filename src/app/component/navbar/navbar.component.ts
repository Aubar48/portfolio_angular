import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  toggleTheme() {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-bs-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-bs-theme', newTheme);

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
    }
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined' && typeof document !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
    }
  }
}
