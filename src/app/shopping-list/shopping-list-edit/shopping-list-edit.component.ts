import { Component, EventEmitter, OnInit, Output, NgModule, Input } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    
  }

  addIngredient = (event: Event, name : string, amount : string) => {
    
    event.preventDefault()
    this.shoppingListService.onAddIngredient(new Ingredient(name, parseInt(amount)))
    
    amount = "0"
    name = ""
  }

  clearIngredient(name : HTMLInputElement, amount : HTMLInputElement){
    name.value = ""
    amount.value = "0"
  }

}
