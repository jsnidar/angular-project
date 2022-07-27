import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipes : Recipe[] = []
  private recipeChangeSub : Subscription

  constructor(
    private recipesService: RecipesService,
    private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes()

    this.route.params.subscribe(() => this.recipes = this.recipesService.getRecipes()
    )

    this.recipeChangeSub = this.recipesService.recipeChange
    .subscribe(() => {
      this.recipes = this.recipesService.getRecipes()
    })  
  }

  ngOnDestroy(){
    this.recipeChangeSub.unsubscribe()
  }

}
