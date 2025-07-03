import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SwalModalService } from '@app/shared/services';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit, OnDestroy {
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #sanitizer = inject(DomSanitizer);
  #swal = inject(SwalModalService);
  #translate = inject(TranslateService);
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
    // if (event.origin !== this.url) return;
    if (event.data && event.data.data && event.data?.data.status === 'cancel') {
      this.#swal
        .Notifier(this.#translate.instant('PaymentCancelledSuccessfully'))
        .then(() => {
          this.#router.navigate(['/']);
        });
    }
    if (event.data && event.data.data && event.data?.data.message) {
      this.#swal.Notifier(event.data.data.message);
    }
  };

  ngOnDestroy(): void {
    window.removeEventListener('message', this.messageHandler);
  }
}
