import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public links: string[] = [
    'Categories',
    'Subscriptions',
    'Obligatory',
    'Statistics',
  ];
  public activeLink: string = '';
  public userFullName: string = localStorage.getItem('userFullName') || '';
  @Input() isLoggedIn!: boolean;
  @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  public onLogout(): boolean {
    this.logoutClicked.emit();
    return false;
  }
}