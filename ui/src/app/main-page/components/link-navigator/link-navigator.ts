import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainPageApiService } from '../../main-page.api.service';
import { LinkModel } from '../../../../../models/generated/link.model';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-link-navigator',
  imports: [],
  templateUrl: './link-navigator.html',
  styleUrl: './link-navigator.css',
})
export class LinkNavigator {
	path: string;

	constructor(private router: Router, private apiService: MainPageApiService) {
		this.path = this.router.url.substring(1, this.router.url.length);
		this.apiService.getOriginalLink(new LinkModel({link: this.path}))
			.subscribe({
				next: (x) => {
					window.location.href = x.link
				},
				error: () => {
					window.location.href = environment.baseUrl;
				}
			});

	}
}
