import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from "@angular/router";

interface MenuItem {
	title: string;
	icon?: string;
	children?: MenuItem[];
	expanded?: boolean;
}
@Component({
	selector: 'app-main-layout',
	imports: [RouterOutlet, CommonModule, RouterModule, FormsModule],
	templateUrl: './main-layout.html',
	styleUrl: './main-layout.css'
})
export class MainLayout {
	sidebarOpen = true;
	searchTerm = '';
	activeItem: MenuItem | null = null;

	menu: MenuItem[] = [
		{
			title: 'Dashboard',
			icon: 'speedometer2',
		},
		{
			title: 'Management',
			icon: 'folder',
			children: [
				{ title: 'Users', icon: 'people' },
				{ title: 'Roles', icon: 'key' },
				{ title: 'Settings', icon: 'gear' },
			],
		},
		{
			title: 'Reports',
			icon: 'bar-chart-line',
			children: [
				{ title: 'Sales', icon: 'graph-up' },
				{ title: 'Expenses', icon: 'cash' },
			],
		},
	];

	filteredMenu: MenuItem[] = [...this.menu];

	toggleSidebar() {
		this.sidebarOpen = !this.sidebarOpen;
	}

	toggleExpand(item: MenuItem) {
		if (item.children) {
			item.expanded = !item.expanded;
		}
		this.activeItem = item;
	}

	selectItem(item: MenuItem, event: MouseEvent) {
		event.stopPropagation();
		this.activeItem = item;
		// Add routing or other logic here
	}

	filterMenu() {
		const term = this.searchTerm.toLowerCase().trim();

		if (!term) {
			this.filteredMenu = [...this.menu];
			return;
		}

		this.filteredMenu = this.menu
			.map((item) => this.filterItem(item, term))
			.filter((item) => item !== null) as MenuItem[];
	}

	private filterItem(item: MenuItem, term: string): MenuItem | null {
		if (item.title.toLowerCase().includes(term)) {
			return { ...item };
		}

		if (item.children) {
			const filteredChildren = item.children
				.map((child) => this.filterItem(child, term))
				.filter((child) => child !== null) as MenuItem[];

			if (filteredChildren.length > 0) {
				return { ...item, children: filteredChildren, expanded: true };
			}
		}

		return null;
	}
}