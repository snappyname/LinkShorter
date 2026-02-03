import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { AppConsts } from '../../../app.const';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
	selector: 'app-login',
	imports: [TuiButton, TuiIcon, TranslatePipe],
	templateUrl: './login.html',
	styleUrl: './login.scss',
})
export class Login {
	constructor(public store: Store) {}

	protected navigateToRegister() {
		this.store.dispatch(new Navigate(['']));
	}

	protected loginByGoogle() {
		const params = new URLSearchParams(AppConsts.googleAuthSettings);
		window.location.href = AppConsts.googleAuthWindow + params.toString();
	}

	protected loginByGithub() {
		const params = new URLSearchParams(AppConsts.githubAuthSettings);
		window.location.href = AppConsts.githubAuthWindow + params.toString();
	}
}
