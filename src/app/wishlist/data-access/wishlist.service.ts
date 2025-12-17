import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  favoriteIds = signal<number[]>([]);

  toggleFavorite(id: number) {
    this.favoriteIds.update((ids) => {
      if (ids.includes(id)) {
        return ids.filter((currentId) => currentId !== id);
      } else {
        return [...ids, id];
      }
    });
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds().includes(id);
  }
}
