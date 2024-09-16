import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() lang!: string
  @Output() langChange = new EventEmitter()

  changeLanguageEmitter(event: Event) {
    const lang = (event.target as HTMLSelectElement).value
    this.langChange.emit(lang)
  }
}
