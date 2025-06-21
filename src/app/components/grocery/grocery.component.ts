import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '../../../models/grocery.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  addToBucket,
  removeFromBucket,
} from '../../store/actions/bucket.action';
import {
  grocerySelector,
  selectedGroceries,
} from '../../store/selectors/groceries.selector';
import { groceryActions } from '../../store/actions/grocery.action';
import { GroceryService } from '../../grocery.service';

@Component({
  selector: 'app-grocery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css',
})
export class GroceryComponent {
  groceries$?: Observable<Grocery[]>;
  // groceries$?: Signal<Grocery[]>;
  count$?:Observable<number>
  behaviourCount$?:Observable<number>

  constructor(private store: Store<{ groceries: Grocery[] }>, private service:GroceryService) {
    this.store.dispatch(groceryActions.loadGroceries())
    this.groceries$ = store.select(selectedGroceries);
    // this.groceries$ = store.selectSignal(selectedGroceries);

    this.count$ = this.service.getCount()
    this.behaviourCount$ = this.service.getBehaviourCount()
  }

  onTypeChange(event: Event) {
    let selectedType = (event.target as HTMLSelectElement).value;
    if (selectedType) {
      // this.groceries$ = this.store.selectSignal(grocerySelector(selectedType));
      this.groceries$ = this.store.select(grocerySelector(selectedType));
    } else {
      // this.groceries$ = this.store.selectSignal(selectedGroceries);
      this.groceries$ = this.store.select(selectedGroceries);
    }
  }

  increment(item: Grocery) {
    this.service.updateCount(Math.floor(Math.random()*1000))
    this.service.updateBehaviourCount('add')
    const payload = {
      id: item.id,
      name: item.name,
      quantity: 1,
    };

    // this.store.dispatch({type:"[Bucket] add", payload})
    this.store.dispatch(addToBucket({ payload }));
  }
  decrement(item: Grocery) {
    this.service.updateCount(Math.floor(Math.random()*1000))
    this.service.updateBehaviourCount('substract')
    const payload = {
      id: item.id,
      name: item.name,
    };

    this.store.dispatch(removeFromBucket({ payload }));
  }
}
