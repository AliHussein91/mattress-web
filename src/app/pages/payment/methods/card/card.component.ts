import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
export class CardComponent implements OnInit, OnDestroy {
  #route = inject(ActivatedRoute);
  #sanitizer = inject(DomSanitizer);
  url: SafeResourceUrl = ''; // Replace with actual URL

  ngOnInit(): void {
    if (this.#route.snapshot.queryParams['paymentUrl']) {
      this.url = this.#sanitizer.bypassSecurityTrustResourceUrl(
        this.#route.snapshot.queryParams['paymentUrl'],
      );
    }
    window.addEventListener('message', this.messageHandler);
  }

  messageHandler = (event: MessageEvent) => {
    // Optional: verify origin for security
    if (event.origin !== this.url) return;

    if (event.data?.type === 'DATA_READY') {
      console.log('Data from iframe:', event.data.payload);
      // Do something with the data
    }
  };

  ngOnDestroy(): void {
    window.removeEventListener('message', this.messageHandler);
  }
}
