import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

import { Recipe } from './recipe.model';
@Injectable({providedIn: 'root'})


export class RecipesService{

  private recipes: Recipe[] = [
    new Recipe(
        "Beef Tacos", 
        "Easy taco recipe", 
        "data:image/jpeg;base64,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",
        [
          new Ingredient("ground beef", 3), 
          new Ingredient("tortilla", 2), 
          new Ingredient("cheese", 1)
        ]
    ),
    new Recipe(
      "Cheese Burger", 
      "Delicious!", 
      "data:image/jpeg;base64,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", 
      [
        new Ingredient("ground beef", 2), 
        new Ingredient("bun", 1), 
        new Ingredient("tomato slice", 1)
      ]
    )
  ]


  constructor(){

  }

  sendSelected = new EventEmitter<void>()

  getRecipes = () => [...this.recipes]

  getRecipe = (id : number) => [...this.recipes][id]

}