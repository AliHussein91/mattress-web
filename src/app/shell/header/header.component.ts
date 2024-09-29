import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeService } from '../../shared/services/localize.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, RouterLink,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  localizeService = inject(LocalizeService)

  langImg = localStorage.getItem('language')
  lang = this.localizeService.lang()
  isVisible: boolean = false;
  promo = input<string>("register now and get 10% discount using voucher Mattress10")

  ngOnInit(): void {
    // window.addEventListener('resize', () => {
    //   window.innerWidth < 976 ? this.isVisible = false : this.isVisible = true;
    // })
    // window.innerWidth < 976 ? this.isVisible = false : this.isVisible = true;
  }

  changeLang(event: Event ) {
    const lang = (event.target as HTMLSelectElement).value
    this.localizeService.changeLang(lang)
  }

  toggleLang()  {
    let language = this.lang?.toLocaleLowerCase() == "en"? 'ar':'en'
    this.localizeService.changeLang(language)
    this.lang = this.localizeService.lang()
  }

  getImageSrc(): string {
    return this.localizeService.imgChange()
  }
  toggleMenu() {
    this.isVisible = !this.isVisible
  }
}
