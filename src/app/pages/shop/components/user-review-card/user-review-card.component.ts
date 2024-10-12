import { Component, Input } from '@angular/core';
import { IRate } from '@app/shared/types';

@Component({
  selector: 'app-user-review-card',
  standalone: true,
  imports: [],
  templateUrl: './user-review-card.component.html',
  styleUrl: './user-review-card.component.scss'
})
export class UserReviewCardComponent {
@Input() review: IRate = {} as IRate;
}
