import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { LayoutState } from '../shared/layout-state/store/layout.state';
import { distinctUntilChanged } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, TuiRoot],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {
	constructor(store: Store) {
		store
			.select(LayoutState.currentTheme)
			.pipe(distinctUntilChanged())
			.subscribe((x) => document.documentElement.setAttribute('data-theme', x));
	}
}
