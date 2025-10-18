import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifService } from '../../services/notif.service';

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

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});

		this.forgotForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

	onLogin() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}
		alert(JSON.stringify(this.loginForm.value, null, 2));
	}

	onForgotPassword() {
		if (this.forgotForm.invalid) {
			this.forgotForm.markAllAsTouched();
			return;
		}
		this.notif.show('Reset link sent successfully!', 'success', { delay: 4000 });
	}
}