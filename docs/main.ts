// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing'; // Ensure this is correct
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { importProvidersFrom } from '@angular/core';

const appConfig = {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes), // Register the routes here
      HttpClientModule
    )
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
