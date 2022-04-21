import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionInfoComponent } from './transaction-info.component';

describe('TransactionInfoComponent', () => {
  let component: TransactionInfoComponent;
  let fixture: ComponentFixture<TransactionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
