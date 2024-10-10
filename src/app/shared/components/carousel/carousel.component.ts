import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner } from '@app/shared/types';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() banners: Banner[] = [];

  currentImageIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.changeImage();
  }

  changeImage(): void {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.banners.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  changeImageOnClick(index: number): void {
    clearInterval(this.intervalId);
    this.currentImageIndex = index;
    this.changeImage();
  }
}
