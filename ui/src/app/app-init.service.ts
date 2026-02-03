import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SetTheme } from '../shared/layout-state/store/layout.actions';
import { LoadUserFromJWT } from './auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AppInitService {
	constructor(private store: Store) {}

	init(): void {
		this.store.dispatch(new SetTheme('dark'));
		this.store.dispatch(new LoadUserFromJWT());
	}
}
