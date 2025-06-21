import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { GroceryService } from '../../grocery.service';
import { groceryActions } from '../actions/grocery.action';

@Injectable()
export class GroceriesEffects {
  private actions$ = inject(Actions);
  private groceryService = inject(GroceryService);

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(groceryActions.loadGroceries),
      exhaustMap(() => this.groceryService.fetchAllGroceries()
        .pipe(
          map((groceries:any) => (groceryActions.loadGroceriesSuccess({payload:groceries}))),
          catchError(() => of(groceryActions.loadGroceryFailure))
        )
      )
    );
  });
}