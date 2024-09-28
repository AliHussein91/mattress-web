import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProfileNavComponent } from "./profile-nav/profile-nav.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterOutlet,RouterLink, ProfileNavComponent, TranslateModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  @Input() pageTitle: string = 'Personal Profile'

  onNavigation(title: string){
    this.pageTitle = title
  }

}
