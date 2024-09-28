import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LocalizeService {

  translateService = inject(TranslateService)
  lang = signal(localStorage.getItem('language'))
  documentHTML = document.querySelector('html')

  setLanguage() {
    const defaultLange = localStorage.getItem('language') || 'ar';
    this.translateService.setDefaultLang(defaultLange)
    this.translateService.use(defaultLange)
    this.updateDocument(defaultLange)
    this.imgChange()
  }

  changeLang(lang: string): void {
    this.translateService.setDefaultLang(lang)
    this.translateService.use(lang)
    localStorage.setItem('language', lang)
    this.lang.set(lang)
    this.updateDocument(lang)
    this.imgChange()
  }

  // Update HTML Document Properties to match language direction
  updateDocument(lang: string) {
    const htmlDoc = document.querySelector('html')
    if (lang === 'ar') {
      htmlDoc!.setAttribute('direction', 'rtl');
      htmlDoc!.setAttribute('dir', 'rtl');
      htmlDoc!.setAttribute('lang', lang);
      htmlDoc!.style.direction = 'rtl';
    } else {
      htmlDoc!.setAttribute('direction', 'ltr');
      htmlDoc!.setAttribute('dir', 'ltr');
      htmlDoc!.setAttribute('lang', lang);
      htmlDoc!.style.direction = 'ltr';
    }
  }

  imgChange() {
    switch (this.lang()) {
      case 'en':
        return '../../../../assets/img/en.png';
      case 'ar':
        return '../../../../assets/img/ar.png';
      default:
        return '../../../../assets/img/ar.png';
    }
  }
}