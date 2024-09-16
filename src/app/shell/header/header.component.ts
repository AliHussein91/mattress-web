import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  lang: string = 'ar'
  langImg: string = '../../../assets/img/ar.png'
  isVisible: boolean = true;
  @Input() promo: string = "register now and get 10% discount using voucher Mattress10"
  @Output() langChange = new EventEmitter()

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      window.innerWidth < 920 ? this.isVisible = false : this.isVisible = true;
    })
    window.innerWidth < 920 ? this.isVisible = false : this.isVisible = true;
  }

  changeLanguageEmitter(event: Event) {
    const lang = (event.target as HTMLSelectElement).value
    this.lang = lang;
    lang == 'ar' ? this.langImg = "../../../assets/img/ar.png" : this.langImg = "../../../assets/img/en.png"
    this.langChange.emit(lang)
  }


  toggleMenu() {
    this.isVisible = !this.isVisible
  }
}
