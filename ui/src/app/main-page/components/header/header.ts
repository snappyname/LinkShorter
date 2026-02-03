import { Component, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { appRoutes } from '../../../app-routes.const';
import { AuthState } from '../../../auth/store/auth.state';
import { Logout } from '../../../auth/store/auth.actions';
import { TranslatePipe } from '@ngx-translate/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiSwitch } from '@taiga-ui/kit';
import { TuiPlatform } from '@taiga-ui/cdk';
import { FormsModule } from '@angular/forms';
import { ChangeTheme } from '../../../../shared/layout-state/store/layout.actions';

@Component({
	selector: 'app-header',
	imports: [TranslatePipe, TuiButton, TuiIcon, TuiSwitch, TuiPlatform, FormsModule],
	templateUrl: './header.html',
	styleUrl: './header.scss',
})
export class Header {
	public isAuthenticated: Signal<boolean>;

	constructor(public store: Store) {
		this.isAuthenticated = this.store.selectSignal(AuthState.isAuthenticated);
	}

	protected navigateToLogin() {
		this.store.dispatch(new Navigate([appRoutes.auth]));
	}

	protected logout() {
		this.store.dispatch(new Logout());
	}

	protected onThemeChange($event: boolean) {
		this.store.dispatch(new ChangeTheme());
	}
}
