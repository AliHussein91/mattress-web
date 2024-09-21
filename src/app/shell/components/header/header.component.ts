import { Component, EventEmitter, input, Input, OnInit, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  lang = input.required()
  isVisible: boolean = true;
  langImg = input.required<string>()
  promo= input("register now and get 10% discount using voucher Mattress10")
  @Output() langChange = new EventEmitter()

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      window.innerWidth < 920 ? this.isVisible = false : this.isVisible = true;
    })
    window.innerWidth < 920 ? this.isVisible = false : this.isVisible = true;
  }

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value
    this.langChange.emit(lang)
  }


  toggleMenu() {
    this.isVisible = !this.isVisible
  }
}
