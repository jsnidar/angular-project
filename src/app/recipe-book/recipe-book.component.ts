import { Component, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {

  @Output() detail: Recipe

  constructor(private recipesService: RecipesService) {
   }

  ngOnInit(): void {
  }

}
