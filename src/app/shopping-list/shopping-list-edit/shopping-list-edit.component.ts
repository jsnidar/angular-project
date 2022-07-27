import { Component, EventEmitter, OnInit, Output, NgModule, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  
  @ViewChild('formData', { static: false }) formData: NgForm
  
  editMode = false
  editedItemIndex : number
  subscription : Subscription
  editedIngredient: Ingredient

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.
    subscribe((id : number) => {
      this.editedItemIndex = id
      this.editMode = true
      this.editedIngredient = this.shoppingListService.getIngredient(id)

      const { name, amount } = {...this.editedIngredient}
      this.formData.setValue({
        name: name,
        amount: amount
      })
    })
  }


  onSubmit() {
    //this is a method that calls other functions. It cannot be an arrow function
    this.editMode ? this.updateIngredient() : this.addIngredient()
    this.editMode = false
    this.formData.reset()
  }

  addIngredient() {
    const { name, amount } = this.formData.value

    this.shoppingListService
    .onAddIngredient(new Ingredient(name, +amount))
  }

  updateIngredient() {
    const { name, amount } = this.formData.value

    this.shoppingListService.onUpdateIngredient(
      this.editedItemIndex, 
      new Ingredient(name, +amount))
  }

  clearIngredient(){
    this.editMode = false
    this.formData.reset()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
