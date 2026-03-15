import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {

  providers: [

    NgChartsModule,
  
    provideRouter(routes),

    provideAnimations(),

    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  
  ],
};
