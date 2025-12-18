import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private isBrowser = typeof window !== 'undefined';
  private initialIds = this.isBrowser
    ? JSON.parse(localStorage.getItem('wishlist') || '[]')
    : [];

  favoriteIds = signal<number[]>(this.initialIds);

  constructor() {
    effect(() => {
      if (this.isBrowser) {
        localStorage.setItem('wishlist', JSON.stringify(this.favoriteIds()));
      }
    });
  }

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
