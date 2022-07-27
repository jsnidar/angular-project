import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  id : number

  constructor(
    private shoppingListService: ShoppingListService,
    private route : ActivatedRoute,
    private router : Router,
    private recipesService : RecipesService
    ) { 
  }

  ngOnInit(): void {

    this.id = +this.route.snapshot.params['id']
    this.route.params
    .subscribe(() => this.recipe = this.recipesService.getRecipe(this.id))
  }

  addToList = () => {
    this.shoppingListService.addRecipeIngredients(this.recipe.ingredients)
  }

  deleteRecipe(){
    this.recipesService.deleteRecipe(this.id)
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
