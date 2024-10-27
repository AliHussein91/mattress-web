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
import { CountryListFacade } from '@app/core/state/country/facade';
import { Country } from '@app/core/modal';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FlagDropDownComponent } from '@app/shared/components/flag-drop-down/flag-drop-down.component';
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
  imports: [TranslateModule, RouterLink, CommonModule,DropdownModule,FormsModule,FlagDropDownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  protected homePageService = inject(HomePageService);
  protected headerCategories: IHomePageData[] = [];
  protected cartFacade = inject(CartFacade);
  protected cart: ICart = {} as ICart;
  protected contacts: { field: string; id: string; url: string }[] = [];
  protected headerPromoCode: string = '';
  protected countryfacade = inject(CountryListFacade)
  protected countryList: Country[] = [];
  selectedCountry: any;
  ngOnInit(): void {
    this.countryfacade.countylist$.subscribe(res=>{
      this.countryList = res;
      if(localStorage.getItem('selectedCountryId')){
        this.selectedCountry = this.countryList.find((country) => country.id == +localStorage.getItem('selectedCountryId')!);
      }else{
        this.selectedCountry = this.countryList[0];
      }
    })
    if (localStorage.getItem('token') !== null) {
      this.getHeaderNavigation();
      this.cartFacade.cart$.subscribe((res) => {
        this.cart = res;
      });
    }
  }

  getHeaderNavigation() {
    this.homePageService.getStaticContent().subscribe({
      next: (data) => {
        console.log(
          '🚀 ~ HeaderComponent ~ this.homePageService.getStaticContent ~ data:',
          data,
        );
        const { headerCategories,contacts,headerPromoCode } = data;
        this.headerCategories = headerCategories.data;
        this.contacts = contacts.data;
        headerPromoCode && headerPromoCode.data && (this.headerPromoCode = headerPromoCode.data.message);
      },
      error: (err) => {
        console.log('🚀 ~ ProductListComponent ~ error ~ err:', err);
      },
      complete: () => {},
    });
  }

  localizeService = inject(LocalizeService);
  router = inject(Router);
  authService = inject(AuthService);
  profileService = inject(ProfileService);

  langImg = localStorage.getItem('language');
  lang = this.localizeService.lang();
  isVisible: boolean = false;
  promo = input<string>(
    'register now and get 10% discount using voucher Mattress10',
  );
  ad = input<string>('Check out latest products & offers here');

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.localizeService.changeLang(lang);
  }

  selectCountry(event: Country) {
    this.selectedCountry = event;
    localStorage.setItem('selectedCountryId',event.id.toString());

  }
  toggleLang() {
    let language = this.lang?.toLocaleLowerCase() == 'en' ? 'ar' : 'en';
    this.localizeService.changeLang(language);
    this.lang = this.localizeService.lang();
  }

  getImageSrc(): string {
    return this.localizeService.imgChange();
  }
  toggleMenu() {
    this.isVisible = !this.isVisible;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/');
        this.profileService.userProfile.set(null);
        this.authService.isLoggedOut();
      },
      error: (error) => console.log(error),
    });
  }
// factory method return fontawesome icon
  getIcon(icon: string): string {
    switch (icon) {
      case 'facebook_url':
        return 'fab fa-facebook-f';
      case 'twitter_url':
        return 'fab fa-twitter';
      case 'instagram_url':
        return 'fab fa-instagram';
      case 'linkedin_url':
        return 'fab fa-linkedin';
      case 'youtube_url':
        return 'fab fa-youtube';
      case 'whatsapp_url':
        return 'fab fa-whatsapp';
      case 'snapchat_url':
        return 'fab fa-snapchat';
      case 'pinterest_url':
        return 'fab fa-pinterest';
      case 'tiktok_url':
        return 'fab fa-tiktok';
      default:
        return '';
    }
  }

}
