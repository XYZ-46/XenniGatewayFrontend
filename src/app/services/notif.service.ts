import { Injectable } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const bootstrap: any;

export type ToastType = 'success' | 'error' | 'info' | 'warning';

const toastOptionsDefault: ToastOptions = { delay: 3000, pauseOnHover: true }

@Injectable({ providedIn: 'root', })
export class NotifService {
	private readonly containerId = 'global-toast-container';

	constructor() { this.ensureContainerExists(); }

	// Ensure container exists once in body
	private ensureContainerExists(): void {
		if (!document.getElementById(this.containerId)) {
			const container = document.createElement('div');
			container.id = this.containerId;
			container.className = 'toast-container position-fixed top-0 start-50 translate-middle-x p-3';
			container.style.zIndex = '1100';
			container.style.marginTop = '1rem';
			document.body.appendChild(container);
		}
	}

	/**
	 * Show a toast message
	 * @param message Toast text
	 * @param type success | error | info | warning
	 * @param options { delay, pauseOnHover }
	 */
	show(
		message: string,
		type: ToastType = 'info',
		options: ToastOptions = toastOptionsDefault
	): void {
		const container = document.getElementById(this.containerId);
		if (!container) return;

		const bgClass = this.getBgClass(type);

		const toastEl = document.createElement('div');
		toastEl.className = `toast align-items-center text-bg-${bgClass} border-0 mb-2`;
		toastEl.role = 'alert';
		toastEl.ariaLive = 'assertive';
		toastEl.ariaAtomic = 'true';
		toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast" aria-label="Close"></button>
      </div>`;

		container.appendChild(toastEl);

		const toast = new bootstrap.Toast(toastEl, { delay: options.delay ?? 3000 });
		let hideTimeout: number;
		let remainingTime = options.delay ?? 3000;
		let lastTime = Date.now();

		// Bootstrap show
		toast.show();

		// --- Pause/Resume logic ---
		if (options.pauseOnHover) {
			toastEl.addEventListener('mouseenter', () => {
				// Pause timer
				remainingTime -= Date.now() - lastTime;
				toast.hide();
			});

			toastEl.addEventListener('mouseleave', () => {
				// Resume timer
				lastTime = Date.now();
				clearTimeout(hideTimeout);
				hideTimeout = setTimeout(() => toast.hide(), remainingTime);
			});
		}

		// Auto remove after hidden
		toastEl.addEventListener('hidden.bs.toast', () => {
			toastEl.remove();
			clearTimeout(hideTimeout);
		});
	}

	private getBgClass(type: ToastType): string {
		switch (type) {
			case 'success':
				return 'success';
			case 'error':
				return 'danger';
			case 'warning':
				return 'warning';
			default:
				return 'primary';
		}
	}
}

interface ToastOptions {
  delay?: number; // auto close time in ms
  pauseOnHover?: boolean;
}