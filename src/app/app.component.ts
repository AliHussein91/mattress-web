import { AuthService } from './pages/auth/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shell/footer/footer.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './shell/header/header.component';
import { LocalizeService } from './shared/services/localize.service';
import { CountryListFacade } from './core/state/country/facade';
import { CartFacade } from './core/state/cart/facade';
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
  protected cartFacade = inject(CartFacade)
  

  static {
    if (!localStorage.getItem('language')) localStorage.setItem('language', navigator.language.includes('en') ? 'en' : 'ar')
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('../app.worker.ts', import.meta.url));
      worker.onmessage = ({ data }) => {
        // console.log(`page got message: ${data}`);
      };
      worker.postMessage('start');
      worker.postMessage({event: 'api', data: 'https://jsonplaceholder.typicode.com/todos/1'});
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  ngOnInit(): void {
    this.countryfacade.removedAll()
    this.cartFacade.removedAll()
    this.countryfacade.countylist$.subscribe(res=>{
      localStorage.setItem('countryList', JSON.stringify({data:res}))
      localStorage.setItem('selectedCountryId', String(res[0].id))
    })
    if (localStorage.getItem('token') !== null) {
      this.cartFacade.cart$.subscribe(res=>{
      })
    }
    this.authService.autoLogin()
    this.localizeService.setLanguage()
  }


}

