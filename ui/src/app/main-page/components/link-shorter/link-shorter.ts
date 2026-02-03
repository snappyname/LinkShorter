import { Component, DestroyRef, EventEmitter, Output, Signal, signal } from '@angular/core';
import { MainPageApiService } from '../../main-page.api.service';
import { LinkModel } from '../../../../../models/generated/link.model';
import { environment } from '../../../../environment/environment';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../auth/store/auth.state';
import { CreateLinkModel } from '../../../../../models/generated/create-link.model';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { urlValidator } from '../../../../shared/validators/url-validator';

import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiElasticContainer, TuiToastService } from '@taiga-ui/kit';
import { ResultLink } from '../result-link/result-link';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'app-link-shorter',
	imports: [
		ReactiveFormsModule,
		FormsModule,
		FormsModule,
		TuiTextfield,
		TuiButton,
		TuiElasticContainer,
		ResultLink,
		TranslatePipe,
		TranslatePipe,
	],
	templateUrl: './link-shorter.html',
	styleUrl: './link-shorter.scss',
})
export class LinkShorter {
	@Output() successCopied = new EventEmitter<void>();

	public newLink = signal<string>('');

	public isAuthenticated: Signal<boolean>;

	public inputUrlControl = new FormControl('', {
		validators: [Validators.required, urlValidator],
		updateOn: 'change',
	});

	public outputUrlControl = new FormControl(`${environment.baseUrl}/`);

	constructor(
		private apiService: MainPageApiService,
		public store: Store,
		public toast: TuiToastService,
		public translate: TranslateService,
		public destroyRef: DestroyRef,
	) {
		this.isAuthenticated = this.store.selectSignal(AuthState.isAuthenticated);
	}

	protected sendAnonymousLinkRequest(newLink: string) {
		newLink = this.getLinkCode(newLink);
		this.apiService.requestAnonymousNewShortLink(new LinkModel({ link: newLink })).subscribe((x) => {
			this.newLink.set(environment.baseUrl + '/' + x.link);
		});
	}

	protected sendUserLinkRequest(originalLink: string, newLink: string) {
		newLink = this.getLinkCode(newLink);
		this.apiService
			.requestUserNewShortLink(new CreateLinkModel({ originalLink: originalLink, shortenedLink: newLink }))
			.subscribe({
				next: (x) => {
					this.newLink.set(environment.baseUrl + '/' + x.link);
				},
				error: (err) => {
					if (err.status === 409) {
						this.toast
							.open(this.translate.instant('TOASTS.LINK_IN_USE'), {
								autoClose: 1500,
								data: '@tui.copy',
							})
							.pipe(takeUntilDestroyed(this.destroyRef))
							.subscribe();
					}
				},
			});
	}

	protected onUserInputLink(event: Event) {
		const input = event.target as HTMLInputElement;
		const prefix = `${environment.baseUrl}/`;
		if (!input.value.startsWith(prefix)) {
			input.value = prefix;
			this.outputUrlControl.setValue(prefix, { emitEvent: false });
		}
	}

	private getLinkCode(link: string): string {
		const baseUrl = environment.baseUrl;
		return link.slice(baseUrl.length + 1, link.length);
	}
}
