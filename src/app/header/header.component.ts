import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onNavigate = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  navigate = (destination : string) => this.onNavigate.emit(destination)
}
