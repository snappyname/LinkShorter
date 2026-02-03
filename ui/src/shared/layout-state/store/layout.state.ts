import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LayoutStateModel } from './layout.state.model';
import { ChangeTheme, SetTheme } from './layout.actions';

@State<LayoutStateModel>({
	name: 'layout',
	defaults: {
		isMobile: false,
		theme: 'dark',
	},
})
@Injectable()
export class LayoutState {
	@Selector()
	static currentTheme(state: LayoutStateModel) {
		return state.theme ?? 'dark';
	}

	@Action(ChangeTheme)
	changeThemeAction(ctx: StateContext<LayoutStateModel>) {
		ctx.patchState({
			theme: ctx.getState().theme === 'light' ? 'dark' : 'light',
		});
		document.documentElement.setAttribute('data-theme', ctx.getState().theme);
	}

	@Action(SetTheme)
	setThemeAction(ctx: StateContext<LayoutStateModel>, action: SetTheme) {
		ctx.patchState({
			theme: action.theme,
		});
		//		document.documentElement.setAttribute('data-theme', action.theme);
	}
}
