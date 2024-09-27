import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shell/components/footer/footer.component";
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './shell/components/header/header.component';
import { LocalizeService } from './shell/services/localize.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private localizeService = inject(LocalizeService)
  constructor(
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {
 
   }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (this.activatedRoute.snapshot.data['pageTitle']) {
            console.log("🚀 ~ AppComponent ~ this.router.events.subscribe ~ this.activatedRoute.snapshot.data['pageTitle']:", this.activatedRoute.snapshot.data)
            globalThis.document.title = this.activatedRoute.snapshot.data['pageTitle'];
          }
        });
        this.activatedRoute.data.subscribe((data) => {
            console.log("🚀 ~ AppComponent ~ this.activatedRoute.data.subscribe ~ data['pageTitle']", data)
          })
    this.localizeService.setLanguage()
  }
}

