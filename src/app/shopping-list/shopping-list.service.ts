import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})

export class ShoppingListService {

  private ingredients : Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10),
  ]

  constructor() { }

  ingredientChange = new EventEmitter<void>()

  getIngredients = () => [...this.ingredients]
  
  onAddIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient)
    this.ingredientChange.emit()
  }

  onRemoveIngredient = (ingredient: Ingredient) => {
    this.ingredients = this.ingredients.filter(ing => ing !== ingredient)
    this.ingredientChange.emit()
  }

  addRecipeIngredients = (ingredients: Ingredient[]) => {
    this.ingredients.push(...ingredients)
    this.ingredientChange.emit()
  }
}