import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { authInterceptor } from './core/http/interceptros/auth.interceptor';
import { provideStore } from '@ngrx/store';
import { loadingInterceptor } from './core/http/interceptros/loading.interceptor';
import { provideEffects } from '@ngrx/effects';
import { allStoreProviders } from './core/state';
import { FormatterInterceptor } from './core/http/interceptros/formatter.interceptor';
import {
  FacebookLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { sharedProviders } from './shared/shared.providers';
import { provideLottieOptions } from 'ngx-lottie';
import { provideServiceWorker } from '@angular/service-worker';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        FormatterInterceptor,
        loadingInterceptor,
        authInterceptor,
      ]),
    ),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyCTmdLws7K8FXOuqcveVdGyHJOw6Eetut8',
        authDomain: 'mattress-97c3d.firebaseapp.com',
        databaseURL:
          'https://mattress-97c3d-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'mattress-97c3d',
        storageBucket: 'mattress-97c3d.firebasestorage.app',
        messagingSenderId: '345063740261',
        appId: '1:345063740261:web:e6aae939c8a15ee5ae878c',
        measurementId: 'G-62S9WK55NB',
      }),
    ),
    provideMessaging(() => getMessaging()),
    // importProvidersFrom(
    //   provideFirebaseApp(() =>
    //     initializeApp({
    //       apiKey: 'AIzaSyDVz8wZLAJx-PlEF3OOj8NO2M60dB2gl8U',
    //       authDomain: 'mattress-7a34d.firebaseapp.com',
    //       projectId: 'mattress-7a34d',
    //       storageBucket: 'mattress-7a34d.appspot.com',
    //       messagingSenderId: '431976009326',
    //       appId: '1:431976009326:web:d70aabfb7960fee14ce07f',
    //       measurementId: 'G-2QLCT1XZS6',
    //     }),
    //   ),
    //   provideMessaging(() => getMessaging()),
    // ),
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideAnimations(),
    provideStore(),
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    provideEffects(),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true,
    }),
    allStoreProviders,
    ...sharedProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '727793797091-qeg0b7hfpbcm9qb3oihoqvo1m4orasb8.apps.googleusercontent.com',
              // {
              //   oneTapEnabled: true,
              // },
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('871199088044654'),
          },
        ],
        onError: (error) => {
          console.log('🚀 ~ Auth error:', error);
        },
      } as SocialAuthServiceConfig,
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    // provideServiceWorker('ngsw-worker.js', {
    //     enabled: !isDevMode(),
    //     registrationStrategy: 'registerWhenStable:30000'
    // }),
    // provideServiceWorker('ngsw-worker.js', {
    //     enabled: !isDevMode(),
    //     registrationStrategy: 'registerWhenStable:30000'
    // })
  ],
};
