import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthState } from './store/auth.state';
import { Store } from '@ngxs/store';
import { LoadUserFromJWT } from './store/auth.actions';
import { map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private store: Store) {}

	canActivate(): Observable<boolean> {
		const isAuth = this.store.selectSnapshot(AuthState.isAuthenticated);

		if (isAuth) {
			return of(true);
		}

		return this.store.dispatch(new LoadUserFromJWT()).pipe(
			map(() => this.store.selectSnapshot(AuthState.isAuthenticated)),
			)
		;
	}
}
