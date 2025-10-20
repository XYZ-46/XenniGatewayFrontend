import { Routes } from '@angular/router';
import { About1 } from './about1/about1';
import { About2 } from './about2/about2';
import { Login } from './auth/login/login';
import { MainLayout } from './main-layout/main-layout';
import { Users } from './users/users';

export const routes: Routes = [
	{
		path: '',
		component: MainLayout,
		children: [
			{ path: 'users', component: Users },
			{ path: 'about2', component: About2 },
			{ path: 'about1', component: About1 },
		]
	},
	{
		path: '',
		children: [
			{ path: 'auth/login', component: Login },
		]
	},
	{ path: '**', redirectTo: 'about1' },
];
