import { Component,  inject, input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeService } from '../../services/localize.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule,RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  localizeService = inject(LocalizeService)
  lang = this.localizeService.lang()

  changeLanguageEmitter(event: Event) {
    const lang = (event.target as HTMLSelectElement).value
    this.localizeService.changeLang(lang)
  }
}
