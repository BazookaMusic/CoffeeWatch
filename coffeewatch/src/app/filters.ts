import { validateConfig } from '@angular/router/src/config';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

export interface FilterObject {
    category: string;
    minRating: number;
    minPrice: number;
    maxPrice: number;
    maxDist: number;
    sort: string;
  }

export const defaultFilters: FilterObject = {
    minPrice: 0,
    maxPrice: 100000,
    maxDist: 5,
    minRating: 0,
    sort: 'price',
    category: 'Espresso'
  };

  export function fix(value: any, maximize: boolean = false) {
    if (value === '') {
      return maximize ? 1000000 : 0;
    } else {
        return value;
    }
  }
