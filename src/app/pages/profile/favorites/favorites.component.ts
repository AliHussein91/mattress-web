import { ProfileService } from '@app/shared/services/profile.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { SkeletonModule } from 'primeng/skeleton';
import { Product } from '@app/shared/types';
import { LogService, LogType } from '@app/shared/services/log.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [ProductCardComponent, SkeletonModule, TranslateModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  // Injectables
  ProfileService = inject(ProfileService);
  logger = inject(LogService);
  // Loader
  isLoading: boolean = false;
  favoritesList: Product[] = [];

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites() {
    this.isLoading = true;
    this.ProfileService.getFavorites().subscribe({
      next: ({ data }) => {
        this.favoritesList = data;
      },
      error: (error) => {
        this.logger.showSuccess(
          LogType.error,
          error.error.errors[0].title,
          error.error.errors[0].detail,
        );
      },
      complete: () => (this.isLoading = false),
    });
  }
}
