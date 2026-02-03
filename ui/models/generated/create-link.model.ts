export class CreateLinkModel {
    originalLink: string;
    shortenedLink: string;

	constructor(partial?: Partial<CreateLinkModel>) {
		if (partial) {
			Object.assign(this, partial);
		}
	}
}
