import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe

  constructor(private shoppingListService: ShoppingListService,
    private route : ActivatedRoute,
    private recipesService : RecipesService) { 
  }

  ngOnInit(): void {
    this.route.params
    .subscribe(() => this.recipe = this.recipesService.getRecipe(+this.route.snapshot.params['id']))
  }

  addToList = () => {
    this.shoppingListService.addRecipeIngredients(this.recipe.ingredients)
  }

}
