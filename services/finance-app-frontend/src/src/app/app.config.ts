import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      license: "eyJpZCI6Ijc1ZGYyOGJhLTFiMGUtNDVjNS05ZDg3LWMxMjI2MDdmZjBhNyIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODM0NTYxODUsImV4cCI6MTgxNDk5MjE4NX0.qv2tjfm3r1jYUP1jkhh7YNQ6JY-WRhV63aAw7RSXv6ARRj8eL0vLtxB-VAcJQN9z_QDG9n8GnZwXbYQ80HX4Dw"
    }),
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.auth0.audience,
        scope: 'openid profile email read:transactions write:transactions'
      },
      httpInterceptor: {
        allowedList: [
          'http://localhost:3000/*'
        ]
      }

    }),
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn])
    )
  ]
};
