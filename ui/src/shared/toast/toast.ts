import { Component } from '@angular/core';
import { TuiToast } from '@taiga-ui/kit';

@Component({
	selector: 'app-toast',
	imports: [TuiToast],
	templateUrl: './toast.html',
	styleUrl: './toast.css',
})
export class Toast {}
