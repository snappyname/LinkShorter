export class LinkModel {
    link: string;

	constructor(partial?: Partial<LinkModel>) {
		if (partial) {
			Object.assign(this, partial);
		}
	}
}
