import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiButton, TuiIcon } from '@taiga-ui/core';

@Component({
	selector: 'app-result-link',
	imports: [TuiButton, TuiIcon],
	templateUrl: './result-link.html',
	styleUrl: './result-link.scss',
})
export class ResultLink {
	@Input() link: string;

	@Output() linkCopied = new EventEmitter();

	public copyLink(): void {
		navigator.clipboard.writeText(this.link).then(() => {
			this.linkCopied.emit();
		});
	}
}
