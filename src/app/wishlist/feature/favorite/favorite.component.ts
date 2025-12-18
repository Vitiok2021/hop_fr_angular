import {
  ChangeDetectionStrategy,
  Component,
  inject,
  effect,
} from '@angular/core';
import { WishlistService } from '../../data-access/wishlist.service';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent {
  private wishlistService = inject(WishlistService);

  favoriteIds = this.wishlistService.favoriteIds;

  removeItem(id: number) {
    this.wishlistService.toggleFavorite(id);
  }
}
