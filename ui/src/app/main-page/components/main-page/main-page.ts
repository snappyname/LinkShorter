import { Component, DestroyRef, inject } from '@angular/core';
import { Header } from '../header/header';
import { LinkShorter } from '../link-shorter/link-shorter';
import { Footer } from '../footer/footer';
import { TuiToastService } from '@taiga-ui/kit';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import i18next from 'i18next';
import { UserLinksTable } from '../user-links-table/user-links-table';

@Component({
	selector: 'app-main-page',
	imports: [Header, LinkShorter, Footer, UserLinksTable],
	templateUrl: './main-page.html',
	styleUrl: './main-page.scss',
})
export class MainPage {
	protected readonly toast = inject(TuiToastService);

	constructor(
		public destroyRef: DestroyRef,
		public translate: TranslateService,
	) {}

	protected showToaster() {
		this.toast
			.open(this.translate.instant(i18next.t('TOASTS.SUCCESS_COPY')), { autoClose: 1500, data: '@tui.copy' })
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}
}
