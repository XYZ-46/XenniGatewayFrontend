import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
	selector: 'app-main-layout',
	imports: [RouterOutlet],
	templateUrl: './main-layout.html',
	styleUrl: './main-layout.css'
})
export class MainLayout implements AfterViewInit {
	ngAfterViewInit(): void {
		const toggleButton = document.getElementById('sidebarToggle');
		const wrapper = document.getElementById('wrapper');
		if (toggleButton && wrapper) {
			toggleButton.addEventListener('click', () => {
				wrapper.classList.toggle('toggled');
			});
		}
	}
}
