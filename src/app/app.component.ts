import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shell/components/footer/footer.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './shell/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  lang = signal('ar')
  langImg = signal('')
  documentHTML = document.querySelector('html')
  private translateService = inject(TranslateService);

  ngOnInit(): void {
    const defaultLange = localStorage.getItem('language') || 'ar';
    this.translateService.setDefaultLang(defaultLange)
    this.translateService.use(defaultLange)
    if (defaultLange === 'ar') {
      this.langImg.set('../../../assets/img/ar.png')

    } else {
      this.langImg.set('../../../assets/img/en.png')
    }
    updateDocument(defaultLange)
  }

  changeLang(lang: 'en' | 'ar') {
    this.translateService.setDefaultLang(lang)
    this.translateService.use(lang)
    localStorage.setItem('language', lang)
    this.lang.set(lang)
    lang === 'ar' ? this.langImg.set('../../../assets/img/ar.png') : this.langImg.set('../../../assets/img/en.png')
    updateDocument(lang)
  }
}

// Update HTML Document Properties to match language direction
function updateDocument(lang: string) {
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