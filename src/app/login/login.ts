import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

declare const bootstrap: any; // 👈 use Bootstrap JS from global

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit, AfterViewInit {
  @ViewChild('successToast') successToast!: ElementRef;

  loginForm!: FormGroup;
  forgotForm!: FormGroup;
  private toastInstance: any;

  ngAfterViewInit(): void {
    this.toastInstance = new bootstrap.Toast(this.successToast.nativeElement);
  }

  // use Angular's `inject()` in standalone components to satisfy the lint rule
  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    // ✅ Initialize forms inside lifecycle hook — after constructor
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

    // simulate sending reset request ✅ show toast
    setTimeout(() => {
      this.toastInstance.show(); // 
    }, 300);
  }

}
