import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit,OnDestroy {
  images = [
    { url: '../../../assets/img/carousel-1.webp', alt: 'Image 1' },
    { url: '../../../assets/img/carousel-2.webp', alt: 'Image 2' },
    { url: '../../../assets/img/carousel-3.webp', alt: 'Image 3' }
  ];

  currentImageIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.changeImage();
  }

  changeImage(): void {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 3000);
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
