import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from "@angular/router";

interface MenuItem {
	title: string;
	icon?: string;
	route?: string;
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
	sidebarOpen = signal(true);
	searchTerm = '';
	activeItem: MenuItem | null = null;

	readonly maleavatar = '/assets/male_avatar.png';
	readonly femaleavatar = '/assets/male_avatar.png';

	menu: MenuItem[] = [
		{
			title: 'Dashboard',
			icon: 'speedometer2',
			route: '/dashboard',
		},
		{
			title: 'Users',
			icon: 'people',
			children: [
				{ title: 'List Users', icon: 'list', route: '/users/list' },
				{ title: 'Add User', icon: 'person-plus', route: '/users/add' },
			],
		},
		{
			title: 'Reports',
			icon: 'graph-up',
			children: [
				{ title: 'Monthly', icon: 'calendar', route: '/reports/monthly' },
				{ title: 'Annual', icon: 'calendar-event', route: '/reports/annual' },
			],
		},
		{
			title: 'Settings',
			icon: 'gear',
			route: '/settings',
		},
	];

	filteredMenu: MenuItem[] = [...this.menu];

	toggleSidebar() {
		this.sidebarOpen.update(v => !v);
	}

	toggleExpand(item: MenuItem) {
		if (item.children) {
			item.expanded = !item.expanded;
		} else {
			this.selectItem(item);
		}
	}

	selectItem(item: MenuItem, event?: Event) {
		if (event) {
			event.stopPropagation();
		}
		this.activeItem = item;
	}

	filterMenu() {
		const search = this.searchTerm.toLowerCase();
		if (!search) {
			this.filteredMenu = [...this.menu];
			this.menu.forEach(i => i.expanded = false);
			return;
		}

		const filterRecursive = (items: MenuItem[]): MenuItem[] => {
			return items
				.map(item => {
					if (item.children) {
						const filteredChildren = filterRecursive(item.children);
						if (
							item.title.toLowerCase().includes(search) ||
							filteredChildren.length > 0
						) {
							return {
								...item,
								expanded: filteredChildren.length > 0,
								children: filteredChildren,
							};
						}
						return null;
					} else {
						if (item.title.toLowerCase().includes(search)) {
							return item;
						}
						return null;
					}
				})
				.filter(Boolean) as MenuItem[];
		};

		this.filteredMenu = filterRecursive(this.menu);
	}
}