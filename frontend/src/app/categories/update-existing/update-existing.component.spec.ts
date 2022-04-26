import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExistingComponent } from './update-existing.component';

describe('UpdateExistingComponent', () => {
  let component: UpdateExistingComponent;
  let fixture: ComponentFixture<UpdateExistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
