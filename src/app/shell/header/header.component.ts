import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeService } from '../../shared/services/localize.service';
import { AuthService } from '../../pages/auth/services/auth.service';
import { ProfileService } from '../../shared/services/profile.service';
import { HomePageService } from '@app/pages/home/services/home-page.service';
import { CommonModule } from '@angular/common';
import { CartFacade } from '@app/core/state/cart/facade';
import { ICart } from '@app/shared/types';
interface IHomePageData {
  description: any;
    id: string;
    image: string;
    name: string;
    type: string;
  }

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  protected homePageService = inject(HomePageService);
  protected headerCategories: IHomePageData[] = [];
  protected cartFacade = inject(CartFacade)
  protected cart: ICart = {} as ICart; 


  ngOnInit(): void {
    if (this.authService.isSigned()) {
      this.getHeaderNavigation()
      this.cartFacade.cart$.subscribe(res=>{
        this.cart = res
      })
    }
  }
 

  getHeaderNavigation() { 
    this.homePageService.getHomePageData(1,'headerCategories').subscribe({
      next: (data) => {
         const {
          headerCategories, 
        } = data 
        this.headerCategories = headerCategories.data;
      },
      error: (err) => {
        console.log('🚀 ~ ProductListComponent ~ error ~ err:', err);
      },
      complete: () => { 
      },
    });
  }

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
        localStorage.removeItem('addresses')
        localStorage.removeItem('profile')
      },
      error: error => console.log(error)
    })
  }
}

