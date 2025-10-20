import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [FormsModule, CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  users: User[] = [];
  filteredUsers: User[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  searchTerm = '';

  pageSizeOptions = [5, 10, 20, 50, 100];


  constructor() {
    for (let i = 1; i <= 100; i++) {
      this.users.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`
      });
    }
    this.filteredUsers = [...this.users];
    this.calculateTotalPages();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  get pagedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();
    if (term) {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    } else {
      this.filteredUsers = [...this.users];
    }
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.calculateTotalPages();
  }
}


interface User {
  id: number;
  name: string;
  email: string;
}