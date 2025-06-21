import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { empty } from "rxjs";
import { Grocery } from "../../../models/grocery.model";


export const groceryActions = createActionGroup({
    source: "Grocery API",
    events:{
        'Load Groceries': emptyProps,
        "Load Groceries Success": props<{payload:Grocery[]}>(),
        'Load Grocery Failure': emptyProps
    }
})