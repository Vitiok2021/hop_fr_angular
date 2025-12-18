import {
  ChangeDetectionStrategy,
  Component,
  inject,
  effect,
  computed,
  OnInit,
} from '@angular/core';
import { WishlistService } from '../../data-access/wishlist.service';
import { CatalogDataStore } from '../../../catalog/data-access/store/catalog-data.store';
import { ProductCardComponent } from '../../../catalog/ui/product-card/product-card.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteComponent implements OnInit {
  private catalogDataStore = inject(CatalogDataStore);
  private wishlistService = inject(WishlistService);

  favoriteIds = this.wishlistService.favoriteIds;

  ngOnInit(): void {
    this.catalogDataStore.updateData({
      page: 0,
      productCategory: 'all-products',
      sortDirection: undefined,
    });
  }

  removeItem(id: number) {
    this.wishlistService.toggleFavorite(id);
  }

  favoriteProducts = computed(() => {
    const favIds = this.wishlistService.favoriteIds();
    const data = this.catalogDataStore.productData();

    // console.log('ID в обраному:', favIds);
    // console.log('Дані в Сторі:', data);

    if (!data || !data.content) {
      // console.log('Стор порожній або немає поля content');
      return [];
    }

    return data.content.filter((product) =>
      favIds.includes(Number(product.id))
    );

    // const filtered = data.content.filter((product) => {
    //   return favIds.includes(Number(product.id));
    // });

    // console.log('Результат фільтрації:', filtered);
    // return filtered;
  });
}
