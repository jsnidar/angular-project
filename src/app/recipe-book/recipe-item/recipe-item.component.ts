import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe

  id : number
  
  constructor(private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.recipesService.getRecipes().indexOf(this.recipe)
  }

  selectRecipe = () => {
    this.recipesService.sendSelected.emit()
    this.router.navigate([this.id], {relativeTo: this.route})
  }
}
