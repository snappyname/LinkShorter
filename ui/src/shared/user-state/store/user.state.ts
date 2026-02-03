import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { UserStateModel } from './user.state.model';
import { AddUserLink, DeleteUserLink, GetAllUserLinks } from './user.actions';
import { append, patch, removeItem } from '@ngxs/store/operators';
import { UserApiService } from '../user.api.service';
import { tap } from 'rxjs';

@State<UserStateModel>({
	name: 'user',
	defaults: {
		userLinks: [],
	},
})
@Injectable()
export class UserState {
	constructor(private readonly apiService: UserApiService) {}

	@Selector()
	static userLinks(state: UserStateModel) {
		return state.userLinks;
	}

	@Action(AddUserLink)
	addUserLink(ctx: StateContext<UserStateModel>, action: AddUserLink) {
		ctx.setState(
			patch({
				userLinks: append([action.link]),
			}),
		);
	}

	@Action(GetAllUserLinks)
	getAllUserLinks(ctx: StateContext<UserStateModel>) {
		return this.apiService.getAllUserLinks().pipe(
			tap((x) => {
				ctx.setState(
					patch({
						userLinks: x,
					}),
				);
			}),
		);
	}

	@Action(DeleteUserLink)
	deleteUserLink(ctx: StateContext<UserStateModel>, action: DeleteUserLink) {
		return this.apiService.deleteUserLink(action.link.id).pipe(
			tap(() => {
				ctx.setState(
					patch({
						userLinks: removeItem((x) => x.id == action.link.id),
					}),
				);
			}),
		);
	}
}
