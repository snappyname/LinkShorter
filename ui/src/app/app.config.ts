import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsWebSocketPlugin } from '@ngxs/websocket-plugin';
import { provideStore, provideStore as provideStore_alias } from '@ngxs/store';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthRefreshInterceptor } from './core/api/refresh-token-interceptor';
import { environment } from '../environment/environment';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { AppInitService } from './app-init.service';
import { AuthState } from './auth/store/auth.state';
import { LayoutState } from '../shared/layout-state/store/layout.state';

export const appConfig: ApplicationConfig = {
	providers: [
		provideEventPlugins(),
		provideBrowserGlobalErrorListeners(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),

		provideAppInitializer(() => {
			const initService = inject(AppInitService);
			initService.init();
		}),
		provideStore_alias(
			[],
			...(environment.production ? [] : [withNgxsReduxDevtoolsPlugin(), withNgxsLoggerPlugin()]),
			withNgxsFormPlugin(),
			withNgxsRouterPlugin(),
			withNgxsWebSocketPlugin(),
		),
		provideStore([LayoutState, AuthState]),
		provideHttpClient(withInterceptorsFromDi()),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthRefreshInterceptor,
			multi: true,
		},
		provideTranslateService({
			lang: 'en',
			fallbackLang: 'en',
			loader: provideTranslateHttpLoader({
				prefix: '/assets/i18n/',
				suffix: '.json',
			}),
		}),
	],
};
