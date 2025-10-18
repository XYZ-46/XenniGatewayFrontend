import { Routes } from '@angular/router';
import { About1 } from './about1/about1';
import { About2 } from './about2/about2';
import { Home } from './home/home';
import { Login } from './auth/login/login';

export const routes: Routes = [
        { path: 'home', component: Home },
        { path: 'auth/login', component: Login },
        { path: 'about1', component: About1 },
        { path: 'about2', component: About2 },
];
