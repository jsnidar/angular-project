import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({providedIn: 'root'})

export class ShoppingListService {

  private ingredients : Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10),
  ]

  constructor() { }

  ingredientChange = new Subject<void>()
  startedEditing = new Subject<number>()

  getIngredients = () => [...this.ingredients]

  getIngredient = (i : number) => this.ingredients[i]
  
  onAddIngredient = (ingredient: Ingredient) => {
    this.ingredients = [...this.ingredients, ingredient]
    this.ingredientChange.next()
  }

  onRemoveIngredient = (ingredient: Ingredient) => {
    this.ingredients = this.ingredients.filter(ing => ing !== ingredient)
    this.ingredientChange.next()
  }

  onUpdateIngredient(id: number, formData : Ingredient) {
    this.ingredients[id] = formData
    this.ingredientChange.next()
  }

  addRecipeIngredients = (ingredients: Ingredient[]) => {
    this.ingredients.push(...ingredients)
    this.ingredientChange.next()
  }
}