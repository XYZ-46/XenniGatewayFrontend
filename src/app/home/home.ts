import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {
  cards = [
    { title: 'Users', value: 120, icon: 'bi bi-people', color: 'text-primary' },
    { title: 'Orders', value: 58, icon: 'bi bi-cart', color: 'text-success' },
    { title: 'Revenue', value: '$2,340', icon: 'bi bi-currency-dollar', color: 'text-warning' },
    { title: 'Reports', value: 14, icon: 'bi bi-bar-chart', color: 'text-danger' }
  ];

  activities = [
    { user: 'John Doe', action: 'Updated profile', date: '2025-10-19' },
    { user: 'Jane Smith', action: 'Created new order', date: '2025-10-18' },
    { user: 'Michael Lee', action: 'Changed password', date: '2025-10-17' }
  ];

  ngAfterViewInit(): void {
    const toggleButton = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar-wrapper');
    toggleButton?.addEventListener('click', () => {
      sidebar?.classList.toggle('collapsed');
    });
  }
}
