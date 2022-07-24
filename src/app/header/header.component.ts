import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() show : boolean = false


  constructor() { }

  ngOnInit(): void {
  }

  showDropdown = () => this.show = !this.show
}
