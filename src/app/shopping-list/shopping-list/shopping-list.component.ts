import { Component, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients : Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10),
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient = (ingredient: Ingredient) => this.ingredients.push(ingredient)

  onRemoveIngredient = (ingredient: Ingredient) => {
    this.ingredients = this.ingredients.filter(ing => ing !== ingredient)
  }
}
