import { Component } from '@angular/core';

@Component({
  selector: 'app-deleted-notification',
  templateUrl: './deleted-notification.component.html',
  styleUrls: ['./deleted-notification.component.scss'],
})
export class DeletedNotificationComponent {
  public show: boolean = true;

  constructor() {}

  public onCloseClick() {
    this.show = false;
  }
}
