import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shell/header/header.component";
import { FooterComponent } from "./shell/footer/footer.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  direction: 'rtl' | 'ltr' = 'rtl'
  private translateService = inject(TranslateService);
  ngOnInit(): void {
    const defaultLange = localStorage.getItem('language') || 'ar';
    this.translateService.setDefaultLang(defaultLange)
    this.translateService.use(defaultLange)
  }

  changeLang(lang: 'en' | 'ar') {
    this.translateService.setDefaultLang(lang)
    this.translateService.use(lang)
    localStorage.setItem('language', lang)
    lang === 'en' ? this.direction = 'ltr' : this.direction = 'rtl'
  }

}
