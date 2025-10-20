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
	// filteredUsers: User[] = [];

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
		this.calculateTotalPages();
	}

	calculateTotalPages() {
		this.totalPages = Math.ceil(this.users.length / this.pageSize);
	}

	get pagedUsers(): User[] {
		const startIndex = (this.currentPage - 1) * this.pageSize;
		return this.users.slice(startIndex, startIndex + this.pageSize);
	}

	onSearchChange() {
		const term = this.searchTerm.trim().toLowerCase();
		if (term) {
			this.users = this.users.filter(user =>
				user.name.toLowerCase().includes(term) ||
				user.email.toLowerCase().includes(term)
			);
		} else {
			this.users = [...this.users];
		}
		this.currentPage = 1;
		this.calculateTotalPages();
	}

	onPageSizeChange() {
		this.currentPage = 1;
		this.calculateTotalPages();
	}

	goToPage(page: number | string) {
		if (typeof page !== 'number') return;
		if (page < 1 || page > this.totalPages) return;
		this.currentPage = page;
		console.log(`Current Page: ${this.currentPage}`);
	}

	get pages(): (number | string)[] {
		const pages: (number | string)[] = [];

		// Define sliding window boundaries
		let startPage: number;
		let endPage: number;

		if (this.currentPage > 4) {
			startPage = Math.max(this.currentPage - 3, 2);
		} else {
			startPage = 1;
		}

		// If currentPage < totalPages - 3, exclude page totalPages
		if (this.currentPage < this.totalPages - 3) {
			endPage = Math.min(this.currentPage + 3, this.totalPages - 1);
		} else {
			endPage = this.totalPages;
		}

		// Left ellipsis
		if (startPage > 2) {
			pages.push('...');
		}

		// Add page numbers in window
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		// Right ellipsis
		if (endPage < this.totalPages - 1) {
			pages.push('...');
		}

		return pages;
	}

	goToFirst() {
		this.goToPage(1);
	}

	goToLast() {
		this.goToPage(this.totalPages);
	}

	goToPrevious() {
		this.goToPage(this.currentPage - 1);
	}

	goToNext() {
		this.goToPage(this.currentPage + 1);
	}

}


interface User {
	id: number;
	name: string;
	email: string;
}