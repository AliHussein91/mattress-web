import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  title = 'Mattress Web'
  private localizeService = inject(LocalizeService)

  ngOnInit(): void {
    this.localizeService.setLanguage()
  }
}

