import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { importProvidersFrom } from '@angular/core';

const appConfig = {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      HttpClientModule
    )
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
