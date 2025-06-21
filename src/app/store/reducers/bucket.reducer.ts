import { createReducer, on } from '@ngrx/store';
import { Bucket } from '../../../models/bucket.model';
import { addToBucket, removeFromBucket } from '../actions/bucket.action';

const initialState: Bucket[] = [];

export const bucketReducer = createReducer(
  initialState,
  on(addToBucket, (state, action) => {
    let idx = state.findIndex((item) => item.id === action.payload.id);
    if (idx !== -1) {
      let newData = JSON.parse(JSON.stringify(state));
      newData[idx].quantity = newData[idx].quantity + action.payload.quantity;
      return newData;
    } else {
      return [...state, action.payload];
    }
  }),
  on(removeFromBucket, (state, action)=>{
    let idx = state.findIndex((item) => item.id === action.payload.id);
    if (idx !== -1) {
        let newData = JSON.parse(JSON.stringify(state));
        if(newData[idx].quantity === 1) newData.splice(idx, 1)
        else newData[idx].quantity = newData[idx].quantity - 1;
        return newData;
      } else {
        return state;
      }
  })
);
