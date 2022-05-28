import { Component, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {

  @Output() detail : Recipe

  constructor() { }

  ngOnInit(): void {
  }

  getSelected(recipe : Recipe){
    this.detail = recipe
  }
}
