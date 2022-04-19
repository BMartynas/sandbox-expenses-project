import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public links: string[] = [
    'categories',
    'subscriptions',
    'obligatory',
    'statistics',
  ];
  public activeLink: string = '';
  public userFullName: string = localStorage.getItem('userFullName') || '';
  @Input() public isLoggedIn!: boolean;
  @Output() public logoutClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  public onLogout(): boolean {
    this.logoutClicked.emit();
    return false;
  }
}
