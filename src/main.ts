import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// import { About1 } from './app/about1/about1';
// import { About2 } from './app/about2/about2';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));