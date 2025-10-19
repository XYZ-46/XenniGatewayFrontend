import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifService } from '../../services/notif.service';
import { AuthService } from '../../services/auth-service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './login.html',
	styleUrls: ['./login.css']
})
export class Login implements OnInit {
	loginForm!: FormGroup;
	forgotForm!: FormGroup;

	// use Angular's `inject()` in standalone components to satisfy the lint rule
	private readonly fb = inject(FormBuilder);
	private readonly notif = inject(NotifService);
	private readonly authService = inject(AuthService);
	private readonly http = inject(HttpClient);
	private readonly forgotPasswordURL = '/v1/auth/reset-password'

	// API validation errors
	errorMessages: Record<string, string[]> = {};

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			Username: ['', [Validators.required, ]],
			Password: ['', Validators.required],
		});

		this.forgotForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

	async onLogin() {
		// remove token from localstorage
		this.authService.logout();

		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		try {
			await this.authService.login(this.loginForm.value);
		} catch (err: unknown) {
			if (err instanceof HttpErrorResponse && err.error?.ErrorDetails) {
				this.errorMessages = err.error.ErrorDetails;
			}
		}
	}

	async onForgotPassword() {
		// remove token from storage
		this.authService.logout();
		
		if (this.forgotForm.invalid) {
			this.forgotForm.markAllAsTouched();
			return;
		}

		try {
			await firstValueFrom(this.http.post(environment.apiBaseUrl + this.forgotPasswordURL, { email: this.forgotForm.value }));
			this.forgotForm.reset();
		} catch {
			// intentionally ignored: non-critical failure
		}
	}
}