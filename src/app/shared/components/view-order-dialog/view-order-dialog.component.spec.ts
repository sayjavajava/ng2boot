import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderDialogComponent } from './view-order-dialog.component';

describe('ViewOrderDialogComponent', () => {
  let component: ViewOrderDialogComponent;
  let fixture: ComponentFixture<ViewOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
