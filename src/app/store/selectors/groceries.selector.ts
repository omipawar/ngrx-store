import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Grocery } from '../../../models/grocery.model';

export const selectedGroceries = createFeatureSelector<Grocery[]>('groceries');

export const grocerySelector = (type: string) =>
  createSelector(selectedGroceries, (state) => {
    if (type) return state.filter((item) => item.type === type);
    else return state;
  });
