import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedNotificationComponent } from './deleted-notification.component';

describe('DeletedNotificationComponent', () => {
  let component: DeletedNotificationComponent;
  let fixture: ComponentFixture<DeletedNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
