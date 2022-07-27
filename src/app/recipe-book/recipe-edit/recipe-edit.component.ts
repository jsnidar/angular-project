import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm : FormGroup

  id : number
  editMode = false
  formHeader : string
  recipeIngredients : FormArray

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private recipesService : RecipesService,
    private fb : FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null;
        this.formHeader = this.editMode ? "Edit Recipe" : "Create Recipe"
        this.initForm()
      }
    )
  }


  private initForm() {

    const recipeRecord = this.recipesService.getRecipe(this.id)
    

    this.recipeForm = this.editMode ? 
      this.fb.group({
        name: [recipeRecord.name, Validators.required],
        imagePath: [recipeRecord.imagePath, Validators.required],
        description: [recipeRecord.description, Validators.required],
        ingredients: this.fb.array(
          recipeRecord.ingredients.map(ing =>
            this.fb.group({
              name : [
                ing.name, 
                Validators.required
              ],
              amount : [
                ing.amount, 
                [Validators.required, Validators.min(1)]
              ]
            })
          )
        )
      }) :  
      this.fb.group({
        name: [null, [Validators.required]],
        imagePath: [null, [Validators.required]],
        description: [null, [Validators.required]],
        ingredients: this.fb.array([])
      })
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.fb.group({
        name : [null, Validators.required],
        amount : [null, [Validators.required, Validators.min(1)]]
      })
    )
  }

  removeIngredient(i : number){
    return (<FormArray>this.recipeForm.get('ingredients')).removeAt(i)
  }

  clearForm(){
    this.recipeForm.reset()
    this.router.navigate(
      this.editMode ? ['/recipes', this.id] : ['/recipes']
    )
  }
  onSubmit(){

    const { name, imagePath, description, ingredients } = this.recipeForm.value

    const recipe = new Recipe(name, description, imagePath, ingredients.map(ing => new Ingredient(ing.name, ing.amount)))
    if (this.editMode) {
      this.recipesService.updateRecipe(recipe, this.id)
      this.router.navigate(['/recipes', this.id])
    }else{
      this.recipesService.addRecipe(recipe)
      this.router.navigate(['/recipes', this.recipesService.size() - 1])
    }
  }

}
