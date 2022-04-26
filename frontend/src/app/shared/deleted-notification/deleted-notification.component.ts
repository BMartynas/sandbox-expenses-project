import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-deleted-notification',
  templateUrl: './deleted-notification.component.html',
  styleUrls: ['./deleted-notification.component.scss'],
})
export class DeletedNotificationComponent {
  public show: boolean = true;
  @Input() public itemName!: string;

  constructor() {}

  public onCloseClick() {
    this.show = false;
  }
}
