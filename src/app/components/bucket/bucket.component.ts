import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Bucket } from '../../../models/bucket.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { GroceryService } from '../../grocery.service';


@Component({
  selector: 'app-bucket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bucket.component.html',
  styleUrl: './bucket.component.css'
})
export class BucketComponent {

   myBucket$?:Observable<Bucket[]>
   count$?:Observable<number>
    behaviourCount$?:Observable<number>

   constructor(
    private store:Store<{buckets:Bucket[]}>,
    private service:GroceryService
   ){
    this.myBucket$ = store.select("buckets")
    this.count$ = this.service.getCount()
    this.behaviourCount$ = this.service.getBehaviourCount()
   }

}
