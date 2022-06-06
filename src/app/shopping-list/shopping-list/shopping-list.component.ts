import { Component, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  
  ingredients : Ingredient[]
  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.ingredientChange.subscribe(
      () => this.ingredients = this.shoppingListService.getIngredients()
    )
   }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
  }

}
