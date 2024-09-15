import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() promo: string = "- سجل الأن واحصل علي هديتك خصة 10% استخدم كود Mattress10 -"
}
