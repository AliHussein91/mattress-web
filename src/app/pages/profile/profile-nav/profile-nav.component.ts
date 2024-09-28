import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-nav',
  standalone: true,
  imports: [TranslateModule, RouterLink,RouterLinkActive],
  templateUrl: './profile-nav.component.html',
  styleUrl: './profile-nav.component.scss'
})
export class ProfileNavComponent {
  @Output() currentPage = new EventEmitter<string>()

  onNavigation(pageTitle: string) {
    this.currentPage.emit(pageTitle)
  }
}
