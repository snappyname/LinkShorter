import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '../auth/store/auth.state';
import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageApiService } from './main-page.api.service';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutState } from '../../shared/layout-state/store/layout.state';
import { UserState } from '../../shared/user-state/store/user.state';
import { UserApiService } from '../../shared/user-state/user.api.service';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		NgxsModule.forFeature([AuthState, LayoutState, UserState]),
		MainPageRoutingModule,
		TranslateModule,
	],
	providers: [MainPageApiService, UserApiService],
})
export class MainPageModule {}
