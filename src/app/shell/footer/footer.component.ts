import { Component,  inject, input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LocalizeService } from '../../shared/services/localize.service';

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
    location.reload();
  }
}
