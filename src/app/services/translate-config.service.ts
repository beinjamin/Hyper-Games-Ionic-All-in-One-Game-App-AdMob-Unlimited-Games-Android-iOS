import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  constructor(
    private translate: TranslateService
  ) { }

  getDefaultLanguage(){    
    let language = this.translate.getBrowserLang();
    if (language === 'ar') {
      document.documentElement.dir = "rtl";
      this.translate.setDefaultLang(language);
      return language;
    }
    if (language === 'ur') {
      document.documentElement.dir = "rtl";
      this.translate.setDefaultLang(language);
      return language;
    }
    this.translate.setDefaultLang(language);
    return language;
  }

  setLanguage(setLang) {
    if (setLang === 'ar') {
      document.documentElement.dir = "rtl";
      this.translate.use(setLang);
    
    } else if (setLang === 'ur') {
      document.documentElement.dir = "rtl";
      this.translate.use(setLang);
    
    } else {
      document.documentElement.dir = "ltr";
      this.translate.use(setLang);
    }
  }

}