import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  view : string = "shopping-list" || "recipe-list"

  title = 'Project';

  onNavigate = (destination: string) => this.view = destination
}
