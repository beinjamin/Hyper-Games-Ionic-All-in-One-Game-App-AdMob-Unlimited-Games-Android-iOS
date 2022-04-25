import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './services/translate-config.service';
import { LazyLoadImageModule,  LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, LazyLoadImageModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (LanguageLoader),
      deps: [HttpClient]
    }
  })],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    AppComponent,
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks },
    TranslateConfigService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
