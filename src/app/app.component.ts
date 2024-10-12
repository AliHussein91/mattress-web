import { AuthService } from './pages/auth/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shell/footer/footer.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './shell/header/header.component';
import { LocalizeService } from './shared/services/localize.service';
import { END_Points } from './core/http/global/global-config';
import { CountryListFacade } from './core/state/country/facade';
import { HttpClient } from '@angular/common/http';
import { FormatterService } from './shared/services/formatter.service';
import { map } from 'rxjs';
import { FormatterSingleton } from './shared/util';
import { GMapComponent } from "./shared/components/g-map/g-map.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LogService } from './shared/services/log.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TranslateModule, GMapComponent,ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService, LogService]
})
export class AppComponent implements OnInit {
  title = 'Mattress Web'
  private localizeService = inject(LocalizeService)
  private authService = inject(AuthService)
  translateService = inject(TranslateService)
  protected countryfacade = inject(CountryListFacade)
  countriesURL = END_Points.countries.countryList
  formatter = FormatterSingleton.getInstance()

  static {
    if (!localStorage.getItem('language')) localStorage.setItem('language', navigator.language.includes('en') ? 'en' : 'ar')
    // console.log("🚀 ~ AppComponent ~ lang:", localStorage.getItem('language'))
    // console.log(END_Points.auth.login) 
  }
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    // console.log("🚀 ~ AppComponent ~ this.translateService.getDefaultLang():", this.translateService.currentLang)
  }

  ngOnInit(): void {

    this.http.get(this.countriesURL).subscribe({
      next: async data => {
        const countryList = await this.formatter.formatData(data)
        localStorage.setItem('countryList', JSON.stringify(countryList))
      },
      error: error => console.log(error)
      
    })
    this.countryfacade.removedAll()
    // this.router.events.subscribe((event) => {
    //   if (this.activatedRoute.snapshot.data['pageTitle']) {
    //         console.log("🚀 ~ AppComponent ~ this.router.events.subscribe ~ this.activatedRoute.snapshot.data['pageTitle']:", this.activatedRoute.snapshot.data)
    //         globalThis.document.title = this.activatedRoute.snapshot.data['pageTitle'];
    //       }
    //     });
    //     this.activatedRoute.data.subscribe((data) => {
    //         console.log("🚀 ~ AppComponent ~ this.activatedRoute.data.subscribe ~ data['pageTitle']", data)
    //       })
    this.authService.autoLogin()
    this.localizeService.setLanguage()
  }


}

