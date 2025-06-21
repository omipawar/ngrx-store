import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Grocery } from '../models/grocery.model';

@Injectable({
  providedIn: 'root',
})
export class GroceryService {
  private count: Subject<number> = new Subject<number>();
  private behaviourCount: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  constructor(private http: HttpClient) {}

  fetchAllGroceries(): Observable<Grocery[]> {
    return this.http.get<Grocery[]>('http://localhost:5000/groceries');
  }

  getCount(): Observable<number> {
    return this.count.asObservable();
  }

  getBehaviourCount(): Observable<number> {
    return this.behaviourCount.asObservable();
  }

  updateCount(value: number) {
    this.count.next(value);
  }
  updateBehaviourCount(operation: string) {
    if (operation === 'add')
      this.behaviourCount.next(this.behaviourCount.getValue() + 1);
    if (operation === 'substract')
      this.behaviourCount.next(this.behaviourCount.getValue() - 1);
  }
}
