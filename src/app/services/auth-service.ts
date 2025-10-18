import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { NotifService } from './notif.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly notif = inject(NotifService);
    private readonly http = inject(HttpClient);
    private readonly loginURL = '/v1/auth/login'
    private readonly refreshTokenURL = '/v1/auth/refresh-token'

    async login(credentials: { username: string, password: string }) {
        this.logout();

        const token = await firstValueFrom<LoginResponse>(this.http.post<LoginResponse>(environment.apiBaseUrl + this.loginURL, credentials));
        if (token.Data) this.storeToken(token.Data);
        else this.notif.show('Unhandle Token', 'error');
    }

    async refreshToken(credentials: { AccessToken: string, RefreshToken: string }) {
        const token = await firstValueFrom<LoginResponse>(this.http.post<LoginResponse>(environment.apiBaseUrl + this.refreshTokenURL, credentials));
        if (token.Data) this.storeToken(token.Data);
        else this.notif.show('Unhandle Token', 'error');
    }

    logout() {
        localStorage.removeItem('XenniToken');
        localStorage.removeItem('XenniRefreshToken');
    }

    storeToken(token: { AccessToken: string, RefreshToken: string }) {
        localStorage.setItem('XenniToken', token.AccessToken);
        localStorage.setItem('XenniRefreshToken', token.RefreshToken);
    }

    isValidToken(AccessToken: string) {
        console.log(AccessToken);
        return true;
    }
}

interface LoginResponse {
    Data: {
        AccessToken: string;
        RefreshToken: string;
    };
}
