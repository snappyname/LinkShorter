import { UserLinkModel } from '../../../../models/generated/user-link.model';

export class AddUserLink {
	static readonly type = '[User] Add User Link';
	constructor(public link: UserLinkModel) {}
}

export class GetAllUserLinks {
	static readonly type = '[User] Add All User Links';
}

export class DeleteUserLink {
	static readonly type = '[User] Delete User Links';
	constructor(public link: UserLinkModel) {}
}
