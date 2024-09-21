import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeService } from '../../services/localize.service';

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
  isVisible: boolean = true;
  promo = input<string>("register now and get 10% discount using voucher Mattress10")

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      window.innerWidth < 920 ? this.isVisible = false : this.isVisible = true;
    })
    window.innerWidth < 920 ? this.isVisible = false : this.isVisible = true;
  }

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value
    this.localizeService.changeLang(lang)
  }

  getImageSrc(): string {
    return this.localizeService.imgChange()
  }
  toggleMenu() {
    this.isVisible = !this.isVisible
  }
}
