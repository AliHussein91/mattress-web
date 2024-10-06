import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { authInterceptor } from './core/http/interceptros/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { loadingInterceptor } from './core/http/interceptros/loading.interceptor';
import { provideEffects } from '@ngrx/effects';
import { provideCustomers } from './core/state';
import { FormatterInterceptor } from './core/http/interceptros/message.interceptor';
import { FacebookLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([  loadingInterceptor,authInterceptor])),

    importProvidersFrom(HttpClientModule, TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })),
    provideCustomers,
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideAnimations(),
    provideStore(),
    provideEffects(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '509233123342-8vaq0272r56vltt8k6ppva5sq0e1vc6p.apps.googleusercontent.com',{
                oneTapEnabled:true
              }
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('871199088044654')
          }
        ],
        onError: (error) => {
          console.error(error);
        }
      } as SocialAuthServiceConfig,
    }
]
};
