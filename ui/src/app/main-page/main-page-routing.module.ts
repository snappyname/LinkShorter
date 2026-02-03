import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { LinkNavigator } from './components/link-navigator/link-navigator';

const routes: Routes = [
	{
		path: ``,
		component: MainPage,
	},
	{
		path: '**',
		component: LinkNavigator
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MainPageRoutingModule {}
