import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@app/shared/types';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input() product : Product = new Product();

  stripHTMLTags(str?: string): string {
    console.log("🚀 ~ ProductCardComponent ~ stripHTMLTags ~ str:", str)
    try {
      if(!str) return '';
      return str.replace(/<[^>]*>/g, '');
    } catch (error) {
      console.log("🚀 ~ ProductCardComponent ~ stripHTMLTags ~ error:", error);
      return '';
    }
  }

}
