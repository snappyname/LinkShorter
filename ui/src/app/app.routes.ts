import { Routes } from '@angular/router';
import { appRoutes } from './app-routes.const';

export const routes: Routes = [
	{
		path: appRoutes.auth,
		loadChildren: () => import('../app/auth/auth.module').then((x) => x.AuthModule),
	},
	{
		path: '',
		loadChildren: () => import('./main-page/main-page.module').then((x) => x.MainPageModule),
	},
];
