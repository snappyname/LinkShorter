export class UserLinkModel {
	id: string;
	createdAt: string;
	originalUrl: string;
	shortUrl: string;

	constructor(partial?: Partial<UserLinkModel>) {
		if (partial) {
			Object.assign(this, partial);
		}
	}
}
