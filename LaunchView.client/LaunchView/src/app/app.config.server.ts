import { provideServerRendering, withRoutes } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
//  providers: [provideServerRendering(withRoutes(serverRoutes))]
    providers: []
};

export const config = mergeApplicationConfig(appConfig);
