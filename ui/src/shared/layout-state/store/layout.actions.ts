export class ChangeTheme {
	static readonly type = '[Layout] Change theme';
}

export class SetTheme {
	static readonly type = '[Layout] Set theme';
	constructor(public theme: 'light' | 'dark') {}
}
