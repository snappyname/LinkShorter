import { Component, Signal } from '@angular/core';
import { TuiTable } from '@taiga-ui/addon-table';
import { Store } from '@ngxs/store';
import { DeleteUserLink, GetAllUserLinks } from '../../../../shared/user-state/store/user.actions';
import { UserState } from '../../../../shared/user-state/store/user.state';
import { UserLinkModel } from '../../../../../models/generated/user-link.model';
import { TranslatePipe } from '@ngx-translate/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
	selector: 'app-user-links-table',
	imports: [TuiTable, TranslatePipe, TuiButton, TuiIcon],
	templateUrl: './user-links-table.html',
	styleUrl: './user-links-table.scss',
})
export class UserLinksTable {
	public userLinks: Signal<UserLinkModel[]>;

	protected readonly columns = ['shortLink', 'originalLink', 'createdAt', 'actions'];

	constructor(public store: Store) {
		this.store.dispatch(new GetAllUserLinks());
		this.userLinks = this.store.selectSignal(UserState.userLinks);
	}

	protected deleteLink(item: UserLinkModel) {
		this.store.dispatch(new DeleteUserLink(item));
	}
}
