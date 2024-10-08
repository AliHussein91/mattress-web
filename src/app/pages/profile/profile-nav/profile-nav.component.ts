import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '@app/shared/services/profile.service';
import { FormatterSingleton } from '@app/shared/util';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-nav',
  standalone: true,
  imports: [TranslateModule, RouterLink, RouterLinkActive],
  templateUrl: './profile-nav.component.html',
  styleUrl: './profile-nav.component.scss'
})
export class ProfileNavComponent {
  @Output() currentPage = new EventEmitter<string>()
  profileService = inject(ProfileService)
  formatter = FormatterSingleton.getInstance()


  onNavigation(pageTitle: string) {
    this.currentPage.emit(pageTitle)
  }
}
