import { Routes } from '@angular/router';
import { About1 } from './about1/about1';
import { About2 } from './about2/about2';
import { Home } from './home/home';
import { Login } from './auth/login/login';
import { MainLayout } from './layouts/main-layout/main-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';

export const routes: Routes = [
	{
		path: '',
		component: MainLayout,
		children: [
			{ path: 'about2', component: About2 },
			{ path: 'about1', component: About1 },
		]
	},
	{
		path: '',
		component: BlankLayout,
		children: [
			{ path: 'auth/login', component: Login },
		]
	},
	{ path: '**', redirectTo: 'login' },
	{ path: 'home', component: Home },
	{ path: 'auth/login', component: Login },
];
