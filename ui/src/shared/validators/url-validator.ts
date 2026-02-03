import { AbstractControl, ValidationErrors } from '@angular/forms';

export function urlValidator(control: AbstractControl): ValidationErrors | null {
	if (!control.value) return null;

	try {
		const url = new URL(control.value);
		return ['http:', 'https:'].includes(url.protocol) ? null : { url: true };
	} catch {
		return { url: true };
	}
}
