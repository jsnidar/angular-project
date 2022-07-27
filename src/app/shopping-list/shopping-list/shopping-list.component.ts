import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients : Ingredient[]
  private ingChangeSub : Subscription
  
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {

    this.ingChangeSub = this.shoppingListService.ingredientChange
    .subscribe(() => {
      this.ingredients = this.shoppingListService.getIngredients()
    })

    this.ingredients = this.shoppingListService.getIngredients()
  }

  onEditItem(i : number) {
    this.shoppingListService.startedEditing.next(i)
  }

  ngOnDestroy(){
    this.ingChangeSub.unsubscribe()
  }

}
