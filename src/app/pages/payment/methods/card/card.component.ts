import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #sanitizer = inject(DomSanitizer);
  url: SafeResourceUrl = ''; // Replace with actual URL

  ngOnInit(): void {
    if (this.#route.snapshot.queryParams['paymentUrl']) {
      this.url = this.#sanitizer.bypassSecurityTrustResourceUrl(
        this.#route.snapshot.queryParams['paymentUrl'],
      );
    }
  }
}
