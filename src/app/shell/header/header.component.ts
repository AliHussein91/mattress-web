import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeService } from '../../shared/services/localize.service';
import { AuthService } from '../../pages/auth/services/auth.service';
import { ProfileService } from '../../pages/profile/service/profile.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, RouterLink,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  localizeService = inject(LocalizeService)
  router = inject(Router)
  authService = inject(AuthService)
  profileService = inject(ProfileService)

  langImg = localStorage.getItem('language')
  lang = this.localizeService.lang()
  isVisible: boolean = false;
  promo = input<string>("register now and get 10% discount using voucher Mattress10")
  ad = input<string>("Check out latest products & offers here")

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value
    this.localizeService.changeLang(lang)
  }

  toggleLang() {
    let language = this.lang?.toLocaleLowerCase() == "en" ? 'ar' : 'en'
    this.localizeService.changeLang(language)
    this.lang = this.localizeService.lang()
  }

  getImageSrc(): string {
    return this.localizeService.imgChange()
  }
  toggleMenu() {
    this.isVisible = !this.isVisible
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/')
        this.profileService.userProfile.set(null)
        this.authService.isSigned.set(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userData')
      },
      error: error => console.log(error)
    })
  }
}

