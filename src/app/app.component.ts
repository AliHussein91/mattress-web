import { AuthService } from './pages/auth/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shell/footer/footer.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './shell/header/header.component';
import { LocalizeService } from './shared/services/localize.service';
import { END_Points } from './core/http/global/global-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Mattress Web'
  private localizeService = inject(LocalizeService)
  private authService = inject(AuthService)
  translateService = inject(TranslateService)
  static {
    if(!localStorage.getItem('language'))  localStorage.setItem('language',  navigator.language.includes('en') ? 'en' : 'ar')
    console.log("🚀 ~ AppComponent ~ lang:", localStorage.getItem('language'))
    console.log(END_Points.auth.login) 
  }
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // console.log("🚀 ~ AppComponent ~ this.translateService.getDefaultLang():", this.translateService.currentLang)
  }
 
  ngOnInit(): void {

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

